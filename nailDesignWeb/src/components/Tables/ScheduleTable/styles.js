import styled from 'styled-components';

export const Table = styled.table`
  min-width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 3rem;
  border-radius: 50px;

  td {
    padding: 1rem;
    text-align: center;
    &:last-child {
      display: flex;
      justify-content: space-evenly;
    }
    .icon{
      cursor: pointer;
    }
  }

  th {
    background-color: #f1f1f1;
    padding: 1rem 0;
  }
  tbody{
    :hover{
      background-color: ${(props) => (props.theme.background.primary)};
      color: ${(props) => (props.theme.color.primary)};
      ${(props) => props.color && css`
        ${() => (props.theme.color)};
      `}
      ${(props) => props.background && css`
        ${() => (props.theme.background)};
      `}
    }
    tr{
      border-bottom: 1px solid #52475C;
    }
  }

  @media (max-width: 768px) {
    table {
      width: 100%;
    }
  }
`;