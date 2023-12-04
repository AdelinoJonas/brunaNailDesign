import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f5f9;
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: 0fr;
  grid-template-areas: 'asideNavbar NavbarComponent'
                       'asideNavbar main';

  @media(max-width: 1080px){
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr;
    grid-template-areas: 'MobileNavbarComponent'
                         'main';
  }
`;

export const AsideNavibar = styled.aside`
  width: 24rem;
  top: 0;
  bottom: 0;
  position: fixed;
  grid-area: asideNavbar;
  background-color:#002C50;

  @media(max-width: 1080px){
    width: 100%;
    position: static;
  }
`;

export const Main = styled.main`
  grid-area: main;
  padding: 1.6rem 3.6rem 3rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.6rem;

  @media(max-width: 1080px){
    width: 100%;
    padding: 1.6rem 1.6rem 3rem;
    /* position: static; */
  }
`;

export const ItemGroup = styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap-reverse;
    gap:1.6rem;
`;

export const ClientTableContainer = styled.div`
  grid-area: clientTable;
  flex: 3;
`;

export const Summary = styled.aside`
  grid-area: summary;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 41rem;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(74, 74, 74, 0.15);
  border-radius: 16px;
  padding: 3rem 3.9rem 0.7rem;

  font-family: 'Roboto', sans-serif;
  font-style: normal;

  @media(max-width: 768px){
    display: none;
  }

  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 1rem;
      padding-top: 1rem;
      border-bottom: 1px solid #E2E8F0;

      strong {
        flex: 3;
        text-align: right;
        font-weight: 600;
        font-size: 7.2rem;
        line-height: 8.4rem;
        letter-spacing: -0.02em;

        color: #326188;
      }

      span {
        flex: 1;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.2rem;
        padding: 0 1.95rem;
        text-align: center;
        letter-spacing: -0.02em;
        font-feature-settings: 'calt' off;

        color: #000000;
      }

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border: 0;
      }
    }
  }

  footer {
    text-align: right;
    a {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 2rem;

      padding: 1rem 0;
      color: #002C50;

      &:hover {
        opacity: 0.8;
      }

    }
  }
`;

export const MobileContainer = styled.div`
  display: none;
  @media(max-width: 1080px){
    display: block;
  }
`
