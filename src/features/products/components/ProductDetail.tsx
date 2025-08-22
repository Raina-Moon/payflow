import { useProductQuery } from "../hooks";
import { formatPrice } from "../../../shared/lib/price";

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { data: pd,isLoading,isError } = useProductQuery(productId);
  
    if (isLoading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다. 상품 정보를 불러올 수 없습니다.</div>;
  }

  if (!pd) {
    return <div>상품 정보가 없습니다.</div>
  }

  return (
    <div>
      <img src={pd.image} alt={`${pd.name}의 이미지`} />
      <p>{pd.name}</p>
      <p>{pd.category}</p>
      <p>{formatPrice(pd.price)}</p>
    </div>
  );
};

export default ProductDetail;
