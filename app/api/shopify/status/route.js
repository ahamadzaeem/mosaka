import { NextResponse } from 'next/server';
import { getShopInfo, getShopifyProducts } from '../../../../lib/shopify';

export async function GET() {
  const [shop, products] = await Promise.all([getShopInfo(), getShopifyProducts()]);

  return NextResponse.json({
    connected: Boolean(shop),
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'gx9me0-fg.myshopify.com',
    shop,
    liveProductCount: products.length,
    products: products.map((p) => ({
      id: p.id,
      title: p.name,
      handle: p.slug,
      price: p.priceFormatted,
      variantId: p.shopifyVariantId,
    })),
  });
}
