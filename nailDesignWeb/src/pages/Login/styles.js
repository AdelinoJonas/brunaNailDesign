import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import backgroundImg from '../../assets/mockup1.jpeg';

export const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
`;


export const LeftContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.theme.background.primary)};
  @media (max-width: 768px) {
    header {
      padding: 0rem 3rem;
    }
  }

${(props) => props.background && css`
${() => (props.theme.background)};
`}

  @media (max-width: 1366px) {
    header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0rem;
      img {
        width: 70%;
      }
      @media(max-width: 768px) {
        width: 60%;
      }
    }
  }
`;

export const FormContent = styled.form`
  width: 38.4rem;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  gap: 1.6rem;
  color: ${(props) => (props.theme.color.primary)};
  ${(props) => props.color && css`
    ${() => (props.theme.color)};
  `}
  @media(max-width: 768px) {
    width: 100%;
    padding: 0 3.2rem;
    margin-top: 3rem;
  }
  @media(max-width: 1366px) {
    width: 35.4rem;
    margin-top: 3rem;
  }
  button {
    border: none;
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    padding: 1rem 3rem;
    color: ${(props) => (props.theme.background.white)};;
    background: ${(props) => (props.theme.background.button)};;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;

    ${(props) => props.background && css`
    ${() => (props.theme.background)};
    `}
    &:not(:disabled):hover{
      cursor: pointer;
      opacity: 0.7;
      transition: 0.2s;
    }
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.8px  #A7A7A9;
    }
    &:disabled {
      opacity: 0.7;
      cursor: progress;
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    font-feature-settings: 'calt' off;
    color: ${(props) => (props.theme.color.primary)};
    ${(props) => props.color && css`
      ${() => (props.theme.color)};
    `}
  }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.9rem 1.2rem;
    background: #FFFFFF;
    border: 1px solid ${(props) => (props.isValid ? '#A7A7A9' : '#E93F66')};
    border-radius: 6px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02rem;
    font-feature-settings: 'calt' off;
    color: ${(props) => (props.theme.color.primary)};
  ${(props) => props.color && css`
    ${() => (props.theme.color)};
  `}
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.8px  #A7A7A9;
      border: 1px solid #A7A7A9;
    }
`;

export const InputGroupRow = styled(InputGroup)`
  flex-direction: row;
  justify-content: space-between;
  h3{
    cursor: pointer;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02em;
    color: ${(props) => (props.theme.color.primary)};
    ${(props) => props.color && css`
      ${() => (props.theme.color)};
    `}
  }
`;

export const Icon = styled.div`
  position: absolute;
  top:50%;
  right:1.3rem;
  cursor: pointer;
`;

export const LinkForgotPassword = styled(Link)`
@media (max-width: 768px) {
  width: 64%;
  }
  text-align: right;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${(props) => (props.theme.color.primary)};
  ${(props) => props.color && css`
    ${() => (props.theme.color)};
  `}
  &:hover {
    opacity: 0.95;
    transition: color 0.2s;
  }
  &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px  #A7A7A9;
    }
`;

export const CheckBoxConteiner = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  label {
    font-size: 1.6rem;
    color: ${(props) => (props.theme.color.primary)};
    margin-bottom: 0;
    letter-spacing: -0.02rem;
    font-feature-settings: 'calt' off;
    ${(props) => props.color && css`
    ${() => (props.theme.color)};
  `}
    &:hover {
      cursor: pointer;
    }
  }
  input[type="checkbox"] {
    margin-right: 0.9rem;
  }
`;

export const RightContent = styled.div`
  height: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 1.6rem;
  @media (max-width: 768px) {
    display: none;
  }

  span {
    max-width: 31.875rem;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.2rem;
    text-align: center;
    letter-spacing: -0.02rem;
    font-feature-settings: 'calt' off;
    margin-top: 1.6rem;
    color: #FFFFFF;
    color: ${(props) => (props.theme.color.white)};
  ${(props) => props.color && css`
    ${() => (props.theme.color)};
  `}
  }
`;

export const ErrorMessage = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-feature-settings: 'calt' off;
  padding: 0.8rem 0.4rem 0;
  color: ${(props) => (props.theme.alert.warning)};
  ${(props) => props.alert && css`
    ${() => (props.theme.alert)};
  `}
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  a {
    color: ${({ theme }) => theme.color.black};
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: -0.02em;
    font-feature-settings: 'calt' off;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`;
