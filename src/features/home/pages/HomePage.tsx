import React from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  return (
    <div>
      <div>
        <p>총 사용자 수</p>
        <p>활성 사용자 수</p>
        <p>오늘 결제 성공 건수</p>
        <p>오늘 결제 금액 합계계</p>
        <p>최근 7일 결제 금액 차트</p>
        <p>TOP 5 구매자(사용자명/총 결제액)</p>
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default HomePage;
