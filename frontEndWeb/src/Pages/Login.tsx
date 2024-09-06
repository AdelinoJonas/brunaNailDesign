import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoColor.png';
import '../styles/globalLayout/AllPagesStyles.css';
import '../styles/registerLayout/RegisterLayout.css';

export function Login() {
  const navigate = useNavigate();

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
        <form className="form-content">
          <div className='input-group'>
            <label className="label" htmlFor="email">
              E-mail:
              <input className="input" id="email" type="email" />
            </label>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="password">
              Senha:
              <input className="input" id="password" type="password" />
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
            <a id="signIn" onClick={handleSignUpRedirect}>Cadastre-se aqui.</a>
          </div>
        </form>
      </div>
      <div className="login-image" />
    </div>
  );
}
