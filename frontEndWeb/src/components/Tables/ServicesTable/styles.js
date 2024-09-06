import styled from 'styled-components';

export const Table = styled.table`
  min-width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 3rem;
  border-radius: 50px;

  td {
    padding: 1rem 0;
    text-align: center;
    &:last-child {
      margin: 0 auto;
    }
    .icon{
      cursor: pointer;
    }
    .iconRight{
      cursor: pointer;
      margin-left: 1rem;
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
      .service{
        max-width: 100px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align:start;
      }
      .description{
        max-width: 230px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align:start;
      }
    }
  }

  @media (max-width: 768px) {
    table {
      width: 100%;
    }
  }
`;