import React from "react";
import { UseUiStore } from "../store/uiStore";
import styled from "styled-components";

const GlobalErrorMessage = () => {
  const { isError, setError } = UseUiStore();
  if (!isError) return null;

  const handleClose = () => {
    setError(null);
  };
  return (
    <ErrorWrapper>
      <span>{isError}</span>
      <Button onClick={handleClose}>닫기</Button>
    </ErrorWrapper>
  );
};

export default GlobalErrorMessage;

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  text-align: center;
  z-index: 1000;
  border-bottom: 1px solid #f5c6cb;
`;

const Button = styled.button`
  margin-left: 20px;
  background-color: transparent;
  border: none;
  color: #721c24;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
