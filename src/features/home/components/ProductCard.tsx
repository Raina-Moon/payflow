import React from "react";
import { useProductsQuery } from "../../products/hooks";

const ProductCard = () => {
  const { data: product, isLoading, isError } = useProductsQuery();
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;
  return (
    <div>
      <li>
        {product?.map((i) => (
          <ul key={i.id}>
            <img src={i.image} alt={i.name} />
            <p>{i.name}</p>
            <p>{i.price}</p>
            <p>{i.category}</p>
            <button>상세보기</button>
          </ul>
        ))}
      </li>
    </div>
  );
};

export default ProductCard;
