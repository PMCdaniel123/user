"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-50 px-10 max-sm:px-2 flex justify-between items-center bg-white shadow-lg">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="logo" width={120} height={60} />
      </Link>

      <div className="hidden md:flex gap-10 justify-between items-center text-heading4-bold font-medium">
        <Link
          href="/"
          className={`${
            pathName === "/"
              ? "text-primary font-semibold border-b-2 p-2 border-primary"
              : "text-tertiary hover:text-primary"
          } transition duration-200`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`${
            pathName === "/wishlist"
              ? "text-primary font-semibold border-b-2 p-2 border-primary"
              : "text-tertiary hover:text-primary"
          } transition duration-200`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`${
            pathName === "/orders"
              ? "text-primary font-semibold border-b-2 p-2 border-primary"
              : "text-tertiary hover:text-primary"
          } transition duration-200`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 items-center text-primary border border-tertiary rounded-lg bg-white px-4 py-2 focus-within:border-primary">
        <input
          className="w-full outline-none bg-transparent text-sm bg-white"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer hover:text-primary transition duration-200" />
        </button>
      </div>

      <div className="flex items-center gap-4 relative">
        <Link
          href="/cart"
          className="hidden md:flex items-center gap-2 px-3 py-2 border border-tertiary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-200"
        >
          <ShoppingCart />
          <p className="font-medium text-sm">Cart {cart.cartItems.length}</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden text-gray-600 hover:text-primary transition duration-200"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-14 right-0 w-40 p-3 bg-white shadow-md rounded-lg z-50 flex flex-col gap-3">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-primary"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-primary"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 px-2 py-1 border rounded-lg hover:bg-primary hover:text-white transition duration-200"
            >
              <ShoppingCart />
              <p className="font-medium text-sm">
                Cart {cart.cartItems.length}
              </p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSwitchSessionUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound
              size={30}
              className="cursor-pointer text-tertiary hover:text-primary transition duration-200"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
