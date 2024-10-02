"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeartComponent from "./Heart";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updateUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt={product.title}
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">{product.price}</p>
        <HeartComponent
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
