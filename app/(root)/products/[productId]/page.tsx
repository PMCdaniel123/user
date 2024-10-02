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
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const dynamic = "force-dynamic";
