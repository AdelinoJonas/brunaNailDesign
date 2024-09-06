import styled from "styled-components";

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9;
`;

export const Loader = styled.div`
  border: 7px solid #999999;
  border-top: 7px solid #326188;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  animation: spin 1s linear infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;