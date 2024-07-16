import React, { useState } from 'react';
import UserGateway from './infra/gateway/UserGateway';
import './styles/globalLayout/AllPagesStyles.css';
import './styles/globalLayout/FormStyles.css';

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

  return (
    <div className='create'>
      <form id="createUser" className="register" onSubmit={handleSubmit}>
        <p className="title">CRIAR CONTA COMO USUÁRIO</p>
        <div className="field">
          <label className="label">Name:</label>
          <input 
            id="name" 
            className="input" 
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Email:</label>
          <input 
            id="email" 
            className="input" 
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Telefone:</label>
          <input 
            id="phone" 
            className="input" 
            placeholder="Digite seu Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Senha:</label>
          <input 
            id="password" 
            type="password" 
            className="input" 
            placeholder="Digite uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label">Confirmar Senha:</label>
          <input 
            id="confirmPassword" 
            type="password" 
            className="input" 
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="create-button">
          Cadastrar Usuário
        </button>
        {userId && (
          <div>
            <div className="id">{userId}</div>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateUser;