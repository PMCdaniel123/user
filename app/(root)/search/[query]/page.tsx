import ProductCard from "@/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold">
        Search result for <span className="text-blue-400">{decodedQuery}</span>
      </p>
      {!searchedProducts || searchedProducts.length === 0 ? (
        <p className="text-body-bold my-5">No Products Found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {searchedProducts?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";