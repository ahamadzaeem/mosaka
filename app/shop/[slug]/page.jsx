import { getProductBySlug, getPairedProducts, products } from '../../../data/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams?.slug);
  if (!product) {
    return {
      title: 'Product Not Found | MOSAKA BATHWARE',
    };
  }

  return {
    title: `${product.name} | MOSAKA BATHWARE`,
    description: `${product.tagline} Handcrafted ${product.material} with ${product.finish}. Architectural luxury bathware from Dubai, UAE.`,
    openGraph: {
      title: `${product.name} | MOSAKA BATHWARE`,
      description: product.tagline,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams?.slug);

  if (!product) {
    notFound();
  }

  const pairedProducts = getPairedProducts(product);

  return <ProductDetailClient product={product} pairedProducts={pairedProducts} />;
}
