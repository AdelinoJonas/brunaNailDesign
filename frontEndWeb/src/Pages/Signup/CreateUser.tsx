import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Certifique-se de ter o axios instalado
import '../../styles/globalLayout/AllPagesStyles.css';
import '../../styles/registerLayout/RegisterLayout.css';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Para exibir mensagens de erro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      console.log('Senha e confirmação de senha não coincidem.');
      return;
    }

    try {
      console.log('Enviando dados para criar o usuário...');
      const response = await axios.post('http://localhost:3000/user', {
        name,
        email,
        phone,
        password,
      });

      console.log('Usuário criado com sucesso:', response.data);
      setUserId(response.data.id);
      setError(null); // Limpar mensagem de erro se a requisição for bem-sucedida
      
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      setError('Ocorreu um erro ao criar o usuário.');
    }
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
          <button type="submit" id="submit-button" onClick={()=>navigate("/confirmSignup")}>
            Cadastrar
          </button>
          <button onClick={() => navigate(-1)} className="turn-back">
            Voltar
          </button>
          {error && (
            <div className="error-message">
              <h4>{error}</h4>
            </div>
          )}
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
