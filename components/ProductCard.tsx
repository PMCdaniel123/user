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
      className="w-full max-h-96 flex flex-col gap-2 group cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-xl overflow-hidden bg-white"
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          src={product.media[0]}
          alt={product.title}
          width={280}
          height={320}
          className="object-cover h-[320px] w-full transition-opacity duration-300 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via/60 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        <div className="absolute top-3 right-3 z-10">
          <HeartComponent
            product={product}
            updateSignedInUser={updateSignedInUser}
          />
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors duration-300">
          {product.title}
        </p>

        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-secondary group-hover:text-primary">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
