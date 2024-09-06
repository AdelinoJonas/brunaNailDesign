import { AiOutlinePlus } from 'react-icons/ai';
import styled, { css } from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  width: 10.5rem;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Roboto';
  font-weight: 600;
  padding: 0rem 2rem;
  box-shadow: 0px 2px 4px rgba(74, 74, 74, 0.5);

  background-color: ${(props) => (props.theme.color.white)};
  border-radius: ${(props) => (props.theme.typeNew.borderRadius)};
  border: 1px solid #973f20;
  color: ${(props) => (props.theme.background.primary)};

  ${(props) => props.medium && css`
    ${() => (props.theme.medium)};
  `}
  ${(props) => props.large && css`
    ${() => (props.theme.large)};
  `}
  ${(props) => props.typeNew && css`
    ${() => (props.theme.typeNew)};
  `}


  &:hover{
    opacity: 0.8;
    transition: all 0.2s;
  }

  @media (max-width: 800px) {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
}
  `;

export const Title = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  display: ${(prop) => prop.mobileTextHidden ? "none" : "block"};

  @media (max-width: 1080px) {
    /* display: none; */
}
`;

export const Plus = styled(AiOutlinePlus)`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.color.white};
`;
