import logo from './assets/logoColor.png';
import './styles/registerLayout/RegisterLayout.css';

export function ConfirmSignup() {
  function handleOpenWhatsapp() {
    const message = "Olá, Esqueci minha senha. Pode me ajudar?"
    const whatsappLink = `https://wa.me/5541984498900?text=T${message}`;
    window.open(whatsappLink);
  }

  return (
    <div className="container">
      <div className="leftContent">
        <img src={logo} alt='Bruna Pereira' className="logo"/>
        <h2>CONTA CRIADA COM SUCESSO!</h2>
        <button onClick={()=>handleOpenWhatsapp()} id="loginButton">
          REALIZAR LOGIN
        </button>
      </div>
      <div className="rightContent"/>
    </div>
  );
}