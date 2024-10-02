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

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
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

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your wishlist</p>

      {wishlist.length === 0 ? (
        <p className="text-body-bold my-5">No items in your wishlist.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

export const dynamic = "force-dynamic";