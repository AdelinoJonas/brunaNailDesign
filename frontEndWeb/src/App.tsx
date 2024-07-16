import CreateUser from './CreateUser.jsx';
import UserGatewayHttp from './infra/gateway/UserGatewayHttp.js';
import './styles/globalLayout/AllPagesStyles.css';

function App() {
  const userGateway = new UserGatewayHttp();
  return (
    <div>
      <CreateUser userGateway={userGateway} />
    </div>
  )
}

export default App
