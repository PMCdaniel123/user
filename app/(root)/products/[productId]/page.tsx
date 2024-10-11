import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetail, getRelatedProducts } from "@/lib/actions/actions";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const productDetail = await getProductDetail(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <div>
      <div className="flex justify-center gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <div className="w-1/2 flex justify-center items-center">
          <Gallery productMedia={productDetail.media} />
        </div>
        <div className="w-1/2">
          <ProductInfo productInfo={productDetail} />
        </div>
      </div>
      <div className="flex flex-col items-center mt-20 p-20 bg-quaternary gap-12">
        <p className="text-heading2-bold text-center text-primary">
          Related Products
        </p>
        <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full max-w-[1400px] mx-auto">
          {relatedProducts?.slice(0, 5).map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const dynamic = "force-dynamic";
