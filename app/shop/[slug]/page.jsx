import { getShopifyProductByHandle, getShopifyProducts } from '../../../lib/shopify';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const shopifyProducts = await getShopifyProducts(50).catch(() => []);
  return shopifyProducts
    .filter((p) => p?.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getShopifyProductByHandle(resolvedParams?.slug).catch(() => null);

  if (!product) {
    return {
      title: 'Product Not Found | MOSAKA BATHWARE',
    };
  }

  const seoTitle = product.seo?.title || `${product.name} | MOSAKA BATHWARE`;
  const seoDesc =
    product.seo?.description ||
    product.tagline ||
    product.description ||
    'Architectural luxury bathware from Dubai, UAE.';

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
    getShopifyProductByHandle(slug).catch(() => null),
    getShopifyProducts(50).catch(() => []),
  ]);

  if (!product) {
    notFound();
  }

  const others = (shopifyAll || []).filter((p) => p.slug !== product.slug);
  const complementary = others.filter((p) => p.category !== product.category);
  const pairedProducts = (complementary.length >= 3 ? complementary : others).slice(0, 3);

  return <ProductDetailClient product={product} pairedProducts={pairedProducts} />;
}
