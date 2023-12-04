import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 1fr;
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

export const AsideNavibar = styled.aside`
  top: 0;
  bottom: 0;
  position: fixed;
  grid-area: 1 / 1 / 2 / 2;
  /* background-color:blue; */
  width: 100%;
`;

export const Main = styled.main`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-wrap: wrap;
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
