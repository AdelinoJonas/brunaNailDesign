import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoColor.png';
import UserGateway from '../../infra/gateway/UserGateway';
import '../../styles/globalLayout/AllPagesStyles.css';
import './RegisterLayout.css';

interface CreateUserProps {
  userGateway: UserGateway;
}

const Login: React.FC<CreateUserProps> = ({ userGateway }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const createUser = async () => {
    if (!password || !email) {
      alert('Os campos são obrigatórios!');
      return;
    }
    const input = { email, password };
    try {
      await userGateway.login(input);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser();
  };

  const handleOpenWhatsapp = () => {
    const message = "Olá, Esqueci minha senha. Pode me ajudar?";
    const whatsappLink = `https://wa.me/5541984498900?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt='Logo' className="logo" />
        <form className="form-content" onSubmit={handleSubmit}>
          <div className='input-group'>
            <label className="label" htmlFor="email">
              E-mail:
              <input
                className="input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="password">
              Senha:
              <input
                className="input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='input-group-row'>
            <div className='checkBoxContainer'>
              <input
                className='input'
                type="checkbox"
                id="keepConnected"
              />
              <label htmlFor="keepConnected">Mantenha-me conectado</label>
            </div>
            <a className='linkForgotPassword' onClick={handleOpenWhatsapp}>Esqueci minha senha</a>
          </div>
          <button id="loginButton" type="submit">
            Entrar
          </button>
          <div className='linkContainer'>
            <span>Ainda não tem conta?</span>
            <a className='sign' id="signIn" onClick={handleSignUpRedirect}>Cadastre-se aqui.</a>
          </div>
        </form>
      </div>
      <div className="login-image" />
    </div>
  );
}

export default Login;
