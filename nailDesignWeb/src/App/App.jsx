import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../global/GlobalStyles';
import theme from '../global/theme/theme';
import { MyRoutes } from './routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
