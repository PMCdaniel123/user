import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import ScrollableCollections from "./ScrollableCollections";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-8 py-20 px-20 bg-quaternary mt-20">
      {/* Page Title */}
      <p className="text-heading1-bold text-center text-primary mb-4">
        Explore Our Collections
      </p>

      {/* Collections */}
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold text-tertiary">No Collections Found.</p>
      ) : (
        <ScrollableCollections collections={collections} />
      )}
    </div>
  );
};

export default Collections;
