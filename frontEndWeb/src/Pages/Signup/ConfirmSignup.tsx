import logo from '../../assets/logoColor.png';
import './RegisterLayout.css';
import { useNavigate } from 'react-router-dom';

export function ConfirmSignup() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/")
  }

  return (
    <div className="confirm-container">
      <div className="leftContent">
        <img src={logo} alt='Bruna Pereira' className="logo"/>
        <h2>CONTA CRIADA COM SUCESSO!</h2>
        <button onClick={()=>handleBack()} id="loginButton">
          REALIZAR LOGIN
        </button>
      </div>
      <div className="create-user-image" />
    </div>
  );
}