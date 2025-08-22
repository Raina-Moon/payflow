import React from "react";
import { useProductsQuery } from "../../products/hooks";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../shared/lib/price";

const ProductCard = () => {
  const { data: product, isLoading, isError } = useProductsQuery();
  const navigate = useNavigate();
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;

  return (
    <div>
      <CardList>
        {product?.map((i) => (
          <Card key={i.id}>
            <img src={i.image} alt={i.name} />
            <p>{i.name}</p>
            <p>{formatPrice(i.price)}</p>
            <p>{i.category}</p>
            <button onClick={() => navigate(`/products/${i.id}`)}>
              상세보기
            </button>
          </Card>
        ))}
      </CardList>
    </div>
  );
};

export default ProductCard;

const CardList = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.ul`
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 100%;
    max-height: 150px;
    height: auto;
    border-radius: 10px;
  }

  p {
    margin: 5px 0;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
