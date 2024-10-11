"use client";

import { useState } from "react";
import HeartComponent from "./Heart";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <p className="text-heading3-bold text-primary">{productInfo.title}</p>
        <HeartComponent product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold text-primary">${productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Color:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-primary px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-quaternary text-primary"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-primary px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-quaternary text-primary"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center text-primary">
          <MinusCircle
            className={`${
              quantity === 1 ? "text-grey-2" : "hover:text-red-1 cursor-pointer"
            }`}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline outline-primary text-primary text-base-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
        onClick={() =>
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          })
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
