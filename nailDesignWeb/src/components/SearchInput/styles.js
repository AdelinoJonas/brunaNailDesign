import { BiSearch } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

export const Container = styled.div`
  width: 24vw;
  margin-left: 2.4rem;
  position: relative;

  @media(max-width: 1080px){
    width: 100%;
    margin-left: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4rem;
  padding: 1rem 1.6rem 1rem 4rem;
  border: none;
  border-radius: ${(prop) => prop.showList ? "20px 20px 0 0" : "20px"};
  background-color: ${({ theme }) => theme.background.secundary};

  color: #555555;

    &:focus {
      outline: 0;
  }

  &::placeholder {
    color: #555555;
  }

  @media(max-width: 1080px){
    width: 100%;
    background-color: transparent;
    border: 1px solid #929292;
    margin-left: 0;

    &:focus {
      outline: 0;
      background-color: #F8FAFC;
  }
  }
`

export const SearchIcon = styled(BiSearch).attrs(({ theme }) => ({ size: 20, color: '#555555' }))`
  position: absolute;
  z-index: 1;
  margin: 1rem 1.8rem;

  @media(max-width: 1080px){
    margin: 1rem 1rem 1rem 1.5rem;
  }
`;

export const CloseIcon = styled(IoIosClose).attrs(({ theme }) => ({ size: 20, color: '#555555' }))`
  display: ${(prop) => prop.hidden ? 'block' : 'none'};
  position: absolute;
  z-index: 1;
  margin: 1rem 1.8rem;
  right: 0;
  font-size: 20px;

  &:hover {
    transition: all 0.3s;
    cursor: pointer;
    transform: scale(1.5);
  }
  @media(max-width: 1080px){
    margin: 1rem 1rem 1rem 1.5rem;
  }
`

export const DropdownList = styled.div`
  position:absolute;
  display: flex;
  left: 0px;
  right: 0px;
  max-height: 20rem;

  transform: translate(0px, -1rem);
  transition: all 0.9s;


  `;

export const ListItems = styled.ul`
  overflow: auto;
  width: 100%;
  padding: 0;
  transition: all 0.9s;
  background: ${({ theme }) => theme.background.secundary};
  border-radius: 0px 0px 20px 20px;

  @media(max-width: 1080px){
    border: 1px solid #929292;
    border-top: none;
    background: #F8FAFC;
  }
`;

export const Item = styled.li`
  list-style-type: none;
  padding: 0.5rem 1.8rem;
  color: ${({ theme }) => theme.color.black};

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.02em;
  font-feature-settings: 'calt' off;

  &:hover {
    background-color: ${(prop) => prop.empty ? prop.theme.background.secundary : "rgba(138,158,181, 0.2)"};
    cursor: ${(prop) => prop.empty ?? "pointer"};

    &:last-child {
      border-radius: 0px 0px 20px 20px;
    }
  }
`;
