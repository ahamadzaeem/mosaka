// Shopify Storefront API Client for MOSAKA BATHWARE
// Store: gx9me0-fg.myshopify.com

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'gx9me0-fg.myshopify.com';
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'a3cee2491a1522fcfb1434d65d807ef3';
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch({ query, variables = {}, cache = 'no-store' }) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Shopify API error (${response.status}):`, text);
      return { data: null, errors: [{ message: text }] };
    }

    const json = await response.json();
    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
    }
    return json;
  } catch (error) {
    console.error('Shopify fetch failed:', error);
    return { data: null, errors: [{ message: error.message }] };
  }
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    productType
    vendor
    description
    descriptionHtml
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export function normalizeShopifyProduct(node) {
  if (!node) return null;

  const firstVariant = node.variants?.edges?.[0]?.node;
  const amount = parseFloat(
    firstVariant?.price?.amount || node.priceRange?.minVariantPrice?.amount || '0'
  );
  const currency =
    firstVariant?.price?.currencyCode ||
    node.priceRange?.minVariantPrice?.currencyCode ||
    'AED';

  const images = (node.images?.edges || []).map((e) => e.node.url).filter(Boolean);
  const category = node.productType || 'Basins';

  return {
    id: node.id,
    shopifyId: node.id,
    shopifyVariantId: firstVariant?.id || null,
    slug: node.handle,
    name: node.title,
    category,
    subcategory: node.tags?.[0] || category,
    material: node.tags?.[1] || 'Artisan Crafted',
    finish: node.tags?.[2] || 'Signature Finish',
    price: amount,
    currency,
    priceFormatted: `${currency} ${amount.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    })}`,
    image: images[0] || '/images/products/basin_mahogany_curved.jpg',
    gallery: images.length > 0 ? images : ['/images/products/basin_mahogany_curved.jpg'],
    description: node.description || '',
    tagline: node.description ? node.description.slice(0, 120) : '',
    availableForSale: node.availableForSale,
    variants: (node.variants?.edges || []).map((v) => v.node),
    isShopifyLive: true,
    isFeatured: node.tags?.includes('featured') || false,
  };
}

export async function getShopInfo() {
  const query = `
    query getShopInfo {
      shop {
        name
        description
        primaryDomain {
          url
        }
        paymentSettings {
          currencyCode
        }
      }
    }
  `;
  const res = await shopifyFetch({ query });
  return res?.data?.shop || null;
}

export async function getShopifyProducts(first = 50) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;
  const res = await shopifyFetch({ query, variables: { first } });
  const edges = res?.data?.products?.edges || [];
  return edges.map((e) => normalizeShopifyProduct(e.node)).filter(Boolean);
}

export async function getShopifyProductByHandle(handle) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;
  const res = await shopifyFetch({ query, variables: { handle } });
  return normalizeShopifyProduct(res?.data?.product);
}

// ============================================================================
// SHOPIFY STOREFRONT CART API (Real Checkout Integration)
// ============================================================================

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                id
                title
                handle
                productType
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function createShopifyCart(lines = []) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const res = await shopifyFetch({
    query,
    variables: { input: { lines } },
  });
  return res?.data?.cartCreate?.cart || null;
}

export async function addToShopifyCart(cartId, lines) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const res = await shopifyFetch({
    query,
    variables: { cartId, lines },
  });
  return res?.data?.cartLinesAdd?.cart || null;
}

export async function updateShopifyCartLines(cartId, lines) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const res = await shopifyFetch({
    query,
    variables: { cartId, lines },
  });
  return res?.data?.cartLinesUpdate?.cart || null;
}

export async function removeFromShopifyCart(cartId, lineIds) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const res = await shopifyFetch({
    query,
    variables: { cartId, lineIds },
  });
  return res?.data?.cartLinesRemove?.cart || null;
}

export async function getShopifyCart(cartId) {
  const query = `
    ${CART_FRAGMENT}
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;
  const res = await shopifyFetch({
    query,
    variables: { cartId },
  });
  return res?.data?.cart || null;
}
