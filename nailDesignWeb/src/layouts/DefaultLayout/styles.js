import styled from "styled-components";

export const LayoutContainer = styled.div`
display: grid;
grid-template-columns: 19%;
grid-template-rows: 0fr;
grid-column-gap: 0px;
grid-row-gap: 0px;

  @media(max-width: 1080px){
    /* display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr;
    grid-template-areas: 'MobileNavbarComponent'
                         'main'; */
  }
`;

export const HeaderPage = styled.div`
  background-color: yellow;
  grid-area: 1 / 2 / 2 / 3;
`;

export const AsideNavibar = styled.aside`
  position: fixed;
  grid-area: 1 / 1 / 3 / 2;
`;

export const Main = styled.main`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  @media(max-width: 1000px){
    width: 100%;
  }
`;

export const MobileContainer = styled.div`
  display: none;
  @media(max-width: 1080px){
    display: block;
  }
`
