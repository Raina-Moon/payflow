import React from "react";
import { UseUiStore } from "../store/uiStore";
import styled from "styled-components";

const GlobalSpinner = () => {
  const { isLoading } = UseUiStore();
  if (!isLoading) return null;
  return (
    <Overlay>
      <SpinnerWrapper>
        <div className="loader"></div>
      </SpinnerWrapper>
    </Overlay>
  );
};

export default GlobalSpinner;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerWrapper = styled.div`
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
