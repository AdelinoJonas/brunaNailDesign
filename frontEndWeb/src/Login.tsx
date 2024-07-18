import logo from './assets/logoColor.png';
import './styles/registerLayout/RegisterLayout.css';

export function Login() {
  function handleOpenWhatsapp() {
    const message = "Olá, Esqueci minha senha. Pode me ajudar?"
    const whatsappLink = `https://wa.me/5541984498900?text=T${message}`;
    window.open(whatsappLink);
  }

  return (
    <div className="container">
      <div className="leftContent">
        <img src={logo} alt='Bruna Pereira' className="logo"/>
        <form className="formContent">
          <div className='inputGroup'>
            <label htmlFor="email">
              E-mail
              <input className="input" id="email"/>
            </label>
          </div>
          <div className="inputGroup">
            <label htmlFor="password">
              Senha
              <input className="input" id="password"/>
            </label>
          </div>
          <div className='inputGroupRow'>
            <div className='checkBoxConteiner'>
              <input className='input'
                type="checkbox"
                id="keepConnected"
              />
              <label htmlFor="keepConnected">Mantenha-me conectado</label>
            </div>
            <a className='linkForgotPassword' onClick={handleOpenWhatsapp}> Esqueci minha senha </a>
          </div>
          <button id="loginButton" type="submit">
            Entrar
          </button>
          < div className='linkContainer' >
            <span>Ainda não tem conta?</span>
            <a id="signIn" onClick={handleOpenWhatsapp}>Cadastre-se aqui.</a>
          </div>
        </form>
      </div>
      <div className="rightContent"/>
    </div>
  );
}