export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`
  );

  console.log(collections);

  return await collections.json();
};

export const getCollectionDetail = async (collectionId: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
  );

  const collection = await req.json();
  return collection;
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  return await products.json();
};

export const getProductDetail = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );

  return await product.json();
};

export const getSearchedProducts = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);

  return await res.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
  );
  return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
  );
  return await relatedProducts.json();
};
