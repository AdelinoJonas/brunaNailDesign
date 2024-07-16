import CreateUser from './CreateUser.jsx';
import UserGatewayHttp from './infra/gateway/UserGatewayHttp.js';
import AxiosAdapter from './infra/http/AxiosAdapter.js';
import './styles/globalLayout/AllPagesStyles.css';

const httpClient = new AxiosAdapter();
function App() {
  const userGateway = new UserGatewayHttp(httpClient);
  return (
    <div>
      <CreateUser userGateway={userGateway} />
    </div>
  )
}

export default App
