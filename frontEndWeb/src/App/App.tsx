import { BrowserRouter } from 'react-router-dom';
import { MyRoutes } from './Routes.tsx';
import AxiosAdapter from '../infra/http/AxiosAdapter.js';
// import '../styles/globalLayout/AllPagesStyles';

const httpClient = new AxiosAdapter();
function App() {
  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
        {/* <GlobalStyles /> */}
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      {/* </ThemeProvider> */}
      {/* <Login/>
      <CreateUser userGateway={userGateway} />
      <ConfirmSignup/>
      <FreeTimeTable /> */}
    </div>
  )
}

export default App
