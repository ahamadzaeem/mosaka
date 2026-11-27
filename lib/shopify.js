// Shopify Storefront API Client for MOSAKA BATHWARE
// Store: gx9me0-fg.myshopify.com

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'gx9me0-fg.myshopify.com';
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'a3cee2491a1522fcfb1434d65d807ef3';
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch({ query, variables = {}, revalidate = 60, cache }) {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    };

    if (cache) {
      fetchOptions.cache = cache;
    } else if (typeof revalidate === 'number') {
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(endpoint, fetchOptions);

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
    seo {
      title
      description
    }
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 15) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 25) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    metafields(
      identifiers: [
        { namespace: "custom", key: "dimensions" }
        { namespace: "custom", key: "material" }
        { namespace: "custom", key: "finish" }
        { namespace: "custom", key: "mounting" }
        { namespace: "custom", key: "weight" }
      ]
    ) {
      key
      value
    }
  }
`;

export function formatShopifyPrice(amount, currencyCode = 'AED') {
  const num = parseFloat(amount || '0');
  return `${currencyCode} ${num.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`;
}

export function normalizeShopifyProduct(node) {
  if (!node) return null;

  const variants = (node.variants?.edges || []).map((v) => ({
    ...v.node,
    priceAmount: parseFloat(v.node.price?.amount || '0'),
    priceFormatted: formatShopifyPrice(v.node.price?.amount, v.node.price?.currencyCode),
    compareAtAmount: v.node.compareAtPrice?.amount
      ? parseFloat(v.node.compareAtPrice.amount)
      : null,
    compareAtFormatted: v.node.compareAtPrice?.amount
      ? formatShopifyPrice(
          v.node.compareAtPrice.amount,
          v.node.compareAtPrice.currencyCode
        )
      : null,
  }));

  const firstVariant = variants[0];
  const amount =
    firstVariant?.priceAmount || parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const currency =
    firstVariant?.price?.currencyCode ||
    node.priceRange?.minVariantPrice?.currencyCode ||
    'AED';

  const images = (node.images?.edges || []).map((e) => e.node.url).filter(Boolean);
  const category = node.productType || 'Basins';

  // Extract optional custom metafields
  const metafieldMap = {};
  (node.metafields || []).forEach((mf) => {
    if (mf && mf.key && mf.value) {
      metafieldMap[mf.key] = mf.value;
    }
  });

  // Clean options (exclude single "Title: Default Title" option)
  const options = (node.options || []).filter(
    (opt) => !(opt.name === 'Title' && opt.values?.length === 1 && opt.values[0] === 'Default Title')
  );

  const specifications = {};
  if (firstVariant?.sku) specifications['SKU'] = firstVariant.sku;
  if (node.vendor) specifications['Atelier / Vendor'] = node.vendor;
  if (metafieldMap.material || node.tags?.[1]) {
    specifications['Material'] = metafieldMap.material || node.tags[1];
  }
  if (metafieldMap.finish || node.tags?.[2]) {
    specifications['Finish'] = metafieldMap.finish || node.tags[2];
  }
  if (metafieldMap.dimensions) specifications['Dimensions'] = metafieldMap.dimensions;
  if (metafieldMap.mounting) specifications['Mounting Type'] = metafieldMap.mounting;
  if (metafieldMap.weight) specifications['Weight'] = metafieldMap.weight;

  return {
    id: node.id,
    shopifyId: node.id,
    shopifyVariantId: firstVariant?.id || null,
    sku: firstVariant?.sku || '',
    slug: node.handle,
    name: node.title,
    category,
    subcategory: node.tags?.[0] || category,
    material: metafieldMap.material || node.tags?.[1] || 'Artisan Crafted',
    finish: metafieldMap.finish || node.tags?.[2] || 'Signature Finish',
    dimensions: metafieldMap.dimensions || 'Standard Atelier Dimensions',
    mounting: metafieldMap.mounting || 'Countertop / Architectural Mount',
    weight: metafieldMap.weight || null,
    price: amount,
    currency,
    priceFormatted: formatShopifyPrice(amount, currency),
    compareAtPrice: firstVariant?.compareAtAmount || null,
    compareAtFormatted: firstVariant?.compareAtFormatted || null,
    image: images[0] || '/images/products/basin_mahogany_curved.jpg',
    gallery: images.length > 0 ? images : ['/images/products/basin_mahogany_curved.jpg'],
    description: node.description || '',
    descriptionHtml: node.descriptionHtml || '',
    tagline: node.seo?.description || (node.description ? node.description.slice(0, 140) : ''),
    seo: node.seo || { title: node.title, description: node.description },
    availableForSale: node.availableForSale,
    options,
    variants,
    specifications,
    tags: node.tags || [],
    isShopifyLive: true,
    isFeatured: node.tags?.includes('featured') || false,
  };
}

// Merge live Shopify product with local catalogue enrichment (if handle matches)
export function mergeShopifyWithLocal(shopifyProduct, localProduct) {
  if (!shopifyProduct) return localProduct || null;
  if (!localProduct) return shopifyProduct;

  return {
    ...localProduct,
    ...shopifyProduct,
    // Keep local architectural imagery/specs as fallback if Shopify product has none yet
    image:
      shopifyProduct.gallery?.length > 0 &&
      shopifyProduct.image !== '/images/products/basin_mahogany_curved.jpg'
        ? shopifyProduct.image
        : localProduct.image,
    gallery:
      shopifyProduct.gallery?.length > 0 &&
      shopifyProduct.gallery[0] !== '/images/products/basin_mahogany_curved.jpg'
        ? shopifyProduct.gallery
        : localProduct.gallery,
    dimensions:
      shopifyProduct.dimensions !== 'Standard Atelier Dimensions'
        ? shopifyProduct.dimensions
        : localProduct.dimensions,
    mounting:
      shopifyProduct.mounting !== 'Countertop / Architectural Mount'
        ? shopifyProduct.mounting
        : localProduct.mounting,
    specifications: {
      ...(localProduct.specifications || {}),
      ...(shopifyProduct.specifications || {}),
    },
    features: localProduct.features || [],
    story: localProduct.story || shopifyProduct.description,
    pairedIds: localProduct.pairedIds || [],
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
  const res = await shopifyFetch({ query, cache: 'no-store' });
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
  const res = await shopifyFetch({ query, variables: { first }, revalidate: 60 });
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
  const res = await shopifyFetch({ query, variables: { handle }, revalidate: 60 });
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
    cache: 'no-store',
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
    cache: 'no-store',
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
    cache: 'no-store',
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
    cache: 'no-store',
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
    cache: 'no-store',
  });
  return res?.data?.cart || null;
}
