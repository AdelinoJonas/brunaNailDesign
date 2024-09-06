import React, { useState } from 'react';
import UserGateway from '../infra/gateway/UserGateway';
import '../styles/globalLayout/AllPagesStyles.css';
import '../styles/registerLayout/RegisterLayout.css';

interface CreateUserProps {
  userGateway: UserGateway;
}

const CreateUser: React.FC<CreateUserProps> = ({ userGateway }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  const createUser = async () => {
    if (password !== confirmPassword) {
      alert('Senhas não coincidem!');
      return;
    }
    const input = { name, email, phone, password };
    try {
      const output = await userGateway.save(input);
      setUserId(output); // assumindo que output é o ID retornado pelo backend
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      // Lógica para tratamento de erro, se necessário
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser();
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form">
        <h1 className="title">CADASTRAR-SE</h1>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label" htmlFor="name">
              Nome:
              <input
                id="name"
                className="input"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="email">
              Email:
              <input
                id="email"
                className="input"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="phone">
              Telefone:
              <input
                id="phone"
                className="input"
                placeholder="Digite seu telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="password">
              Senha:
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
          <div className="input-group">
            <label className="label" htmlFor="confirmPassword">
              Confirmar Senha:
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
          <button type="submit" id="submit-button">
            Cadastrar
          </button>
          {userId && (
            <div className="user-id">
              <h4>ID do usuário: {userId}</h4>
            </div>
          )}
        </form>
      </div>
      <div className="create-user-image" />
    </div>
  );
};

export default CreateUser;
