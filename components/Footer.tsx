"use client";

import { useUser } from "@clerk/nextjs";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="bg-primary text-white py-10 px-20 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-heading4-bold mb-4 text-quaternary">About Us</h3>
          <p className="text-small-medium text-white">
            We are a leading e-commerce platform providing the best products at
            unbeatable prices.
          </p>
        </div>

        <div>
          <h3 className="text-heading4-bold mb-4 text-quaternary">
            Quick Links
          </h3>
          <ul className="text-base-medium space-y-4 text-white">
            <li>
              <Link href="/" className="hover:text-tertiary">
                Home
              </Link>
            </li>
            <li>
              <Link
                href={user ? "/wishlist" : "/sign-in"}
                className="hover:text-tertiary"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href={user ? "/orders" : "/sign-in"}
                className="hover:text-tertiary"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href={user ? "/cart" : "/sign-in"}
                className="hover:text-tertiary"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-heading4-bold mb-4 text-quaternary">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/cuong.phammanh.92798"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/cuo_naeee.125/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.linkedin.com/in/c%C6%B0%E1%BB%9Dng-ph%E1%BA%A1m-m%E1%BA%A1nh-79b1b3301/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-[#ccc] italic">
        &copy; {new Date().getFullYear()} Pham Manh Cuong. All rights reserved.
      </div>
    </footer>
  );
}
