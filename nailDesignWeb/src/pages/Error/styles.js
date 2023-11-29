import styled from "styled-components";


export const ContainerError = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
  color: #FFF;
  gap: 2rem
`;
export const Err= styled.h1`
    font-size: 3rem;
    font-weight: 600;
`;
export const ErrMsg = styled.span`
    font-size: 2rem;
    font-weight: 400;
`;