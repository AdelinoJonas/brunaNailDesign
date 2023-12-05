import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family:'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: #52475C;
}

input[type=radio] {
  accent-color: #4A4A4A;
  width: 2rem;
  max-width: 2rem;
  min-width: 2rem;
  height: 2rem;
  min-height: 2rem;
  max-height: 2rem;

  &:hover {
      cursor: pointer;
    }
}


input[type=checkbox] {
  accent-color: #4A4A4A;
  width: 2rem;
  height: 2rem;

  &:hover {
      cursor: pointer;
    }
}

textarea {
  &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      border: 3px solid rgba(85,85,85,0.6);
    }
}


html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}
`;
