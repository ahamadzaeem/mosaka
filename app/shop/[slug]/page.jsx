import { getProductBySlug, getPairedProducts, products as localProducts } from '../../../data/products';
import {
  getShopifyProductByHandle,
  getShopifyProducts,
  mergeShopifyWithLocal,
} from '../../../lib/shopify';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const shopifyProducts = await getShopifyProducts(50).catch(() => []);
  const slugs = new Set(localProducts.map((p) => p.slug));
  shopifyProducts.forEach((p) => {
    if (p?.slug) slugs.add(p.slug);
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

async function resolveProduct(slug) {
  const [shopifyProduct, localProduct] = await Promise.all([
    getShopifyProductByHandle(slug).catch(() => null),
    Promise.resolve(getProductBySlug(slug)),
  ]);

  return mergeShopifyWithLocal(shopifyProduct, localProduct);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await resolveProduct(resolvedParams?.slug);

  if (!product) {
    return {
      title: 'Product Not Found | MOSAKA BATHWARE',
    };
  }

  const seoTitle = product.seo?.title || `${product.name} | MOSAKA BATHWARE`;
  const seoDesc =
    product.seo?.description ||
    `${product.tagline || product.description} Handcrafted ${product.material} with ${product.finish}. Architectural luxury bathware from Dubai, UAE.`;

  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const [product, shopifyAll] = await Promise.all([
    resolveProduct(slug),
    getShopifyProducts(50).catch(() => []),
  ]);

  if (!product) {
    notFound();
  }

  // Build paired/companion products prioritizing live Shopify items
  let pairedProducts = [];
  if (shopifyAll && shopifyAll.length > 1) {
    const others = shopifyAll.filter((p) => p.slug !== product.slug);
    const complementary = others.filter((p) => p.category !== product.category);
    const pool = complementary.length >= 3 ? complementary : others;
    pairedProducts = pool.slice(0, 3);
  } else {
    pairedProducts = getPairedProducts(product);
  }

  return <ProductDetailClient product={product} pairedProducts={pairedProducts} />;
}
