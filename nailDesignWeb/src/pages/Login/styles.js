import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
  background-color: #FFE7D3;
  padding: 1.6rem;


  @media (max-width: 768px) {
    header {
      padding: 0rem 3rem;
    }
  }

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

    color: #FFFFFF;
    background: #F08080;
    border-radius: 4px;

    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;

    text-align: center;

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
    color: #52475C;
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

    color: #555555;

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
    color: #000000;
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
  color: #002C50;

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
    color: #4A4A4A;
    margin-bottom: 0;
    letter-spacing: -0.02rem;
    font-feature-settings: 'calt' off;

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

  h2 {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 3.6rem;

    text-align: center;
    font-feature-settings: 'calt' off;

    color: #FFFFFF;

    margin-top: 4.58rem;
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

    color: #FFFFFF;
    margin-top: 1.6rem;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 0.8rem;
  column-gap: 0.5rem;


  span, a {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.2rem;

    letter-spacing: -0.02rem;
    font-feature-settings: 'calt' off;

    color: #000000;
  }

  a {
    font-weight: 700;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.8px  #A7A7A9;
    }
  }


`;

export const ErrorMessage = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-feature-settings: 'calt' off;
  color: #E93F66;

  padding: 0.8rem 0.4rem 0;
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
      /* color: ${({ theme }) => theme.alert.active} */
      opacity: 0.8;
    }
  }
`;
