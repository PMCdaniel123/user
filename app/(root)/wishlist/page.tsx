"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetail } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(5);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/users`);
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (error) {
      console.log("USER_GET", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);
    if (!signedInUser) {
      return;
    }

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetail(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updateUser: UserType) => {
    setSignedInUser(updateUser);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-20 bg-quaternary mt-20">
      <p className="text-heading1-bold text-center text-primary mb-12">
        Your wishlist
      </p>

      {wishlist.length === 0 ? (
        <p className="text-body-bold my-5">No items in your wishlist.</p>
      ) : (
        <>
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full max-w-[1400px] mx-auto">
            {wishlist.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                updateSignedInUser={updateSignedInUser}
              />
            ))}
          </div>
          {visibleProducts < wishlist.length && (
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

export default Wishlist;

export const dynamic = "force-dynamic";
