"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cart = useCart();
  const router = useRouter();
  const { user } = useUser();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: cart.cartItems,
            customer,
          }),
        });

        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("CHECKOUT_POST", error);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading2-bold text-primary">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart.</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="w-full grid grid-cols-[5fr_2fr_0.5fr] max-sm:flex max-sm:flex-col rounded-lg max-sm:gap-3 hover:bg-quaternary px-6 py-5 justify-between items-center max-sm:items-start"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    alt="product"
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col gap-3 ml-4 text-secondary">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center text-primary">
                  <MinusCircle
                    className={`${
                      cartItem.quantity === 1
                        ? "text-grey-2"
                        : "hover:text-red-1 cursor-pointer"
                    }`}
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer text-primary"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-quaternary rounded-lg px-4 py-5 text-primary">
        <p className="text-heading4-bold">
          Summary{" "}
          <span>{`${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          }`}</span>
        </p>
        <div className="flex justify-between text-body-semibold mt-8">
          <span>Total Amount</span>
          <span>${totalRounded}</span>
        </div>
        <button
          className="outline outline-primary rounded-lg text-body-bold bg-white py-3 w-full hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

export const dynamic = "force-dynamic";
