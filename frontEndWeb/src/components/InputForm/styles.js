import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  label {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.2rem;
    color: #555555;
    margin-bottom: 0.4rem;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.alert.warning};
  padding: 0.8rem 0.4rem 0;
`;
