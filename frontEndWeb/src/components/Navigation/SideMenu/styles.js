import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FFE7D3;
  position: fixed;
  .footerMenu {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    color: #52475C;
  }
  img{
    width: 19vw;
  }
`;
export const LinkContainer = styled.ul`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 2rem;
`;
export const LinkList = styled.li`
  color: #52475C;
  list-style: none;
  padding-left: 2rem;
  font-size: 2rem;
  .img{
    margin-right: 1rem;
  }
  &:hover {
    color: #9a5108;
    font-size: 2rem;
    font-weight: 700;
    opacity: 0.8;
    transition: all 0.3s;
    cursor: pointer;
  }
`;
