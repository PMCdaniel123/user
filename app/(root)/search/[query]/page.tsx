import ProductCard from "@/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="p-20 flex flex-col gap-12">
      <p className="text-heading2-bold text-primary">
        Search result for <span className="text-tertiary">{decodedQuery}</span>
      </p>
      {!searchedProducts || searchedProducts.length === 0 ? (
        <p className="text-body-bold my-5">No Products Found.</p>
      ) : (
        <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full">
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
