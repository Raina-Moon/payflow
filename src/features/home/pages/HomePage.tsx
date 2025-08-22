import React from "react";
import ProductCard from "../components/ProductCard";
import { useUsersQuery } from "../../user/hooks";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { data: users } = useUsersQuery();
  const navigate = useNavigate();
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter((user) => user.active).length || 0;

  return (
    <div>
      <div>
        <p>총 사용자 수 : {totalUsers}명</p>
        <button onClick={() => navigate(`/users`)}>사용자 리스트 보기</button>
        <p>활성 사용자 수 : {activeUsers}명</p>
        <p>오늘 결제 성공 건수</p>
        <p>오늘 결제 금액 합계</p>
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
