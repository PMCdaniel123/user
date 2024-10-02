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

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setIsLike(data.wishlist.includes(product._id));
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

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        toast.error("You need to login!");
        // router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });

        const updatedUser = await res.json();
        setIsLike(updatedUser.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
        setLoading(false);
      }
    } catch (error) {
      console.log("WISHLIST_POST", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <button type="button" onClick={handleLike}>
      <Heart fill={`${isLike ? "red" : "white"}`} />
    </button>
  );
};

export default HeartComponent;
