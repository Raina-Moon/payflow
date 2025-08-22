import React from "react";
import { useParams } from "react-router-dom";
import { useProductQuery } from "../hooks";
import { formatPrice } from "../../../shared/lib/price";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: pd, isLoading, isError } = useProductQuery(Number(id));
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;
  if (!pd) return <div>상품을 찾을 수 없습니다.</div>;
  return (
    <div>
      <img src={pd?.image} alt={`${pd?.name}의 이미지`} />
      <p>{pd?.name}</p>
      <p>{pd?.category}</p>
      <p>{formatPrice(pd?.price)}</p>
    </div>
  );
};

export default ProductDetailPage;
