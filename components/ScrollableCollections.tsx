"use client"; // Marks this as a client-side component

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ScrollableCollections = ({
  collections,
}: {
  collections: CollectionType[];
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={scrollLeft}
        className="absolute h-full -left-14 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-primary opacity-10 hover:opacity-100 transition-all duration-200 text-white"
      >
        <ChevronLeft />
      </button>

      <div
        ref={rowRef}
        className="w-full overflow-x-auto flex items-center space-x-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {collections.map((collection: CollectionType) => (
          <Link
            key={collection._id}
            href={`/collections/${collection._id}`}
            className="group snap-center flex-shrink-0"
          >
            <div className="relative w-[400px] h-60 rounded-lg overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 duration-300">
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={250}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-quaternary opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <p className="text-center mt-4 text-heading4-bold text-tertiary group-hover:text-primary transition-colors duration-300">
              {collection.title}
            </p>
          </Link>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute h-full -right-14 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-primary opacity-10 hover:opacity-100 transition-all duration-200 text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ScrollableCollections;
