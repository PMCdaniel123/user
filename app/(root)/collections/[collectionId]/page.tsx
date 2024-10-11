import ProductCard from "@/components/ProductCard";
import { getCollectionDetail } from "@/lib/actions/actions";
import Image from "next/image";

const CollectionDetail = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collection = await getCollectionDetail(params.collectionId);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={collection.image}
        alt={collection.title}
        width={2000}
        height={500}
        className="w-full h-[800px] object-cover"
      />

      <div className="flex flex-col items-center justify-center gap-12 p-20 bg-quaternary mt-20">
        <p className="text-heading1-bold text-center text-primary">
          {collection.title}
        </p>
        <p className="text-heading3-bold text-center max-w-[900px] text-secondary">
          {collection.description}
        </p>
        {!collection || collection.products.length === 0 ? (
          <p className="text-body-medium text-gray-400 italic text-center">
            No Products Found.
          </p>
        ) : (
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full max-w-[1400px] mx-auto">
            {collection.products.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;

export const dynamic = "force-dynamic";
