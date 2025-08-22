import styled, { keyframes } from "styled-components";
import { UseUiStore } from "../../../shared/store/uiStore";

const ProductCardSkeleton = () => {
  const { isLoading } = UseUiStore();
  if (!isLoading) return null;
  return (
    <SkeletonOverlay>
      <P1 />
      <P2 />
      <P3 />
    </SkeletonOverlay>
  );
};

export default ProductCardSkeleton;

const shimmer = keyframes`
    0% {background-position: -468px 0;}
    100% {background-position: 468px 0;}
`;

const ShimmerBackground = styled.div`
  animation: ${shimmer} 1.5s linear infinite;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 800px 104px;
  height: 1rem;
  border-radius: 4px;
`;

const SkeletonOverlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  height: 300px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
`;

const P1 = styled(ShimmerBackground)`
  width: 40%;
  margin-bottom: 8px;
`;
const P2 = styled(ShimmerBackground)`
  width: 60%;
  margin-bottom: 8px;
`;
const P3 = styled(ShimmerBackground)`
  width: 30%;
`;
