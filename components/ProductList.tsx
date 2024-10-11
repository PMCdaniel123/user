"use client";

import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-20 bg-quaternary mt-20">
      <p className="text-heading1-bold text-center text-primary">
        Best Selling Products
      </p>

      {loading ? (
        <p className="text-body-medium text-gray-400 italic text-center">
          Loading products...
        </p>
      ) : !products || products.length === 0 ? (
        <p className="text-body-medium text-gray-400 italic text-center">
          No Products Found.
        </p>
      ) : (
        <>
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full max-w-[1400px] mx-auto">
            {products.slice(0, visibleProducts).map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {visibleProducts < products.length && (
            <button
              onClick={handleLoadMore}
              className="mt-10 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
