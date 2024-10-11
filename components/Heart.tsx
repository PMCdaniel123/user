"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface HeartProps {
  product: ProductType;
  updateSignedInUser?: (updateUser: UserType) => void;
}

const HeartComponent = ({ product, updateSignedInUser }: HeartProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);

  // Fetch user wishlist status
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setIsLike(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.error("USER_GET", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to login!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
      });

      const updatedUser = await res.json();
      setIsLike(updatedUser.wishlist.includes(product._id));
      updateSignedInUser && updateSignedInUser(updatedUser);
      setLoading(false);
    } catch (error) {
      console.error("WISHLIST_POST", error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className="relative flex items-center justify-center p-3 rounded-full transition-all duration-300 bg-red-50"
    >
      <Heart
        className={`transition-transform transform hover:scale-125 duration-300 text-red-500
        ${loading ? "animate-spin" : ""}`}
        fill={isLike ? "red" : "none"}
        size={24}
      />
    </button>
  );
};

export default HeartComponent;
