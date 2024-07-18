import { ConfirmSignup } from './ConfirmSignup.js';
import CreateUser from './CreateUser.jsx';
import { Login } from './Login.js';
import UserGatewayHttp from './infra/gateway/UserGatewayHttp.js';
import AxiosAdapter from './infra/http/AxiosAdapter.js';
import './styles/globalLayout/AllPagesStyles.css';

const httpClient = new AxiosAdapter();
function App() {
  const userGateway = new UserGatewayHttp(httpClient);
  return (
    <div>
      <Login/>
      <CreateUser userGateway={userGateway} />
      <ConfirmSignup/>
    </div>
  )
}

export default App
