import { useProductsQuery } from "../hooks";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../../../shared/lib/price";
import ProductCardSkeleton from "./ProductCard.Skeleton";
import { useState } from "react";
import Modal from "../../../shared/components/Modal";
import ProductDetail from "./ProductDetail";

const ProductCard = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";

  const [selectedProdId, setSelectedProdId] = useState<number | null>(null);

  const { data: product, isLoading } = useProductsQuery({ q, category });

  const handleDetailModal = (id: number) => {
    setSelectedProdId(id);
  };

  const handleCloseModal = () => {
    setSelectedProdId(null);
  };


  if (isLoading) {
    return (
      <CardList>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </CardList>
    );
  }

  if (!product?.length) return <div>조건에 맞는 상품이 없습니다.</div>;

  return (
    <>
      <CardList>
        {product.map((i) => (
          <Card key={i.id}>
            <img src={i.image} alt={i.name} />
            <p>{i.name}</p>
            <p>{formatPrice(i.price)}</p>
            <p>{i.category}</p>
            <button onClick={() => handleDetailModal(i.id)}>상세보기</button>
          </Card>
        ))}
      </CardList>

      {selectedProdId && (
        <Modal isOpen={!!selectedProdId} onClose={handleCloseModal}>
          <ProductDetail productId={selectedProdId} />
        </Modal>
      )}
    </>
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
