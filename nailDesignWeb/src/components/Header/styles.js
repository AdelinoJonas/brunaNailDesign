import styled from "styled-components";

export const Header = styled.header`
   width: 100%;
  box-shadow: 0px 2px 4px rgba(74, 74, 74, 0.15);
  padding: 2.2rem 3.6rem;
  /* background-color: #FFE7D3; */
  grid-area: 1 / 2 / 2 / 3;
 

  @media(max-width: 1080px){
    background-color: transparent;
    box-shadow: none;
    padding: 1.6rem 1.6rem 0;
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  `;

export const LeftGroup = styled.div`
 display: flex;
 width: 40%;
 
 @media(max-width: 1080px){
   display: none;
  }
  
  div {
    display: flex;
    align-items: center;
    gap: 1.6rem;
 }
`;

export const BackLink = styled.button`
  all: unset;
  margin: 0;
  display: ${({ hidden }) => hidden ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
   opacity: 0.8;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 3.2rem;
  line-height: 3.6rem;
  color: #52475C;
`;

export const LogoImg = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  background-color:#2C669E;

  img {
    width: 6rem;
    height: 6rem;
    object-fit: contain;
  }

  &:hover {
    cursor:pointer;
  }
`;

export const RightGroup = styled.div`
  width: 60%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media(max-width: 1074px){
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
`;
