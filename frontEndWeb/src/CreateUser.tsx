import React, { useState } from 'react';
import UserGateway from './infra/gateway/UserGateway';
import './styles/globalLayout/AllPagesStyles.css';
import './styles/registerLayout/RegisterLayout.css';
import logo from './assets/logoColor.png';
// import './styles/globalLayout/FormStyles.css';

interface CreateUserProps {
  userGateway: UserGateway;
}

const CreateUser: React.FC<CreateUserProps> = ({ userGateway }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  async function createUser() {
    if (password !== confirmPassword) {
      alert('Senhas não coincidem!');
      return;
    }
    const input = { name, email, phone, password }; 
    const output = await userGateway.save(input);
    setUserId(output);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createUser();
  }

  function handleOpenWhatsapp() {
    const message = "Olá, Esqueci minha senha. Pode me ajudar?"
    const whatsappLink = `https://wa.me/5541984498900?text=T${message}`;
    window.open(whatsappLink);
  }

  return (
    <div className="container">
    <div className="leftContent">
      <h1 className="title">CADASTRAR-SE</h1>
      <form className="formContent">
        <div className="inputGroup">
          <label className="label">Name:
            <input 
              id="name" 
              className="input" 
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="inputGroup">
          <label className="label">Email:
          <input 
            id="email" 
            className="input" 
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>
        </div>
        <div className="inputGroup">
          <label className="label">Telefone:
          <input 
            id="phone" 
            className="input" 
            placeholder="Digite seu Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </label>
        </div>
        <div className="inputGroup">
          <label className="label">Senha:
          <input 
            id="password" 
            type="password" 
            className="input" 
            placeholder="Digite uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </label>
        </div>
        <div className="inputGroup">
          <label className="label">Confirmar Senha:
          <input 
            id="confirmPassword" 
            type="password" 
            className="input" 
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </label>
        </div>
        <button type="submit" id="loginButton">
          Cadastrar
        </button>
        {userId && (
          <div>
            <div className="id">{userId}</div>
          </div>
        )}
      </form>
    </div>
    <div className="rightContent"/>
  </div>

  );
}

export default CreateUser;