import React from "react";
import { useUsersQuery } from "../hooks";
import { fmtDate } from "../../../shared/lib/date";
import styled from "styled-components";

const UsersListPage = () => {
  const { data: users, isLoading, isError } = useUsersQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 도중 오류가 발생했습니다.</div>;
  return (
    <Wrap>
      <List>
        {users?.map((u) => (
          <ListCard key={u.id}>
            <p>{u.name}</p>
            <p>{u.email}</p>
            <p>{u.role}</p>
            <p>{u.active ? "활동중" : "비활성화"}</p>
            <p>{fmtDate(u.createdAt)}</p>
          </ListCard>
        ))}
      </List>
    </Wrap>
  );
};

export default UsersListPage;

const Wrap = styled.div`
  display: flex;
  margin: 0 auto;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListCard = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  will-change: box-shadow, transform, border-color;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    border-color: #007bff;
  }
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;
