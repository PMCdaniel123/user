import ProductCard from "@/components/ProductCard";
import { getCollectionDetail } from "@/lib/actions/actions";
import Image from "next/image";

const CollectionDetail = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collection = await getCollectionDetail(params.collectionId);

  console.log(collection);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collection.image}
        alt={collection.title}
        width={1500}
        height={800}
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">{collection.title}</p>
      <p className="text-body-medium text-center max-w-[900px] text-grey-2">
        {collection.description}
      </p>
      <div className="flex gap-16 mx-auto flex-wrap">
        {collection.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;

export const dynamic = "force-dynamic";
