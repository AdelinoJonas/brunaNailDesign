import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${(props) => (!props.isValid ? '#A7A7A9' : '#E93F66')};
  border-radius: 6px;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.2rem;

  color: #555555;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.4px  #A7A7A9;
    border: 0.4px solid #A7A7A9;
  }

  &:disabled{
    background-color: #F1F1F1;
    border: none;
  }
`;
