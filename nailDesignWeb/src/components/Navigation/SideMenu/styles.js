import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FBC4AB;
  .logo{
    padding: 1rem;
  }
  .footerMenu {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
  }
`;
export const LinkContainer = styled.ul`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-top: -9rem;
`;
export const LinkList = styled.li`
  color: #52475C;
  list-style: none;
  display: flex;
  padding-left: 2rem;
  font-size: 1.5rem;
`;
