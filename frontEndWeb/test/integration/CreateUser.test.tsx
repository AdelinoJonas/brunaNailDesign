import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateUser from '../../src/CreateUser';
import axios from 'axios';
import UserGatewayHttp from '../../src/infra/gateway/UserGatewayHttp';
test('Deve cadastrar um usuário via API', async () => {
  const userGateway = new UserGatewayHttp();
  render(<CreateUser userGateway={userGateway} />);

  const nameInput = screen.getByPlaceholderText('Digite seu nome') as HTMLInputElement;
  const emailInput = screen.getByPlaceholderText('Digite seu e-mail') as HTMLInputElement;
  const phoneInput = screen.getByPlaceholderText('Digite seu Telefone') as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('Digite uma senha') as HTMLInputElement;
  const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua senha') as HTMLInputElement;

  fireEvent.change(nameInput, { target: { value: 'Test User' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '123456789' } });
  fireEvent.change(passwordInput, { target: { value: 'Password.123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Password.123' } });
  fireEvent.submit(screen.getByText('Cadastrar Usuário'));
  await waitFor(() => {
    expect(screen.getByText(/[0-9]+/)).toBeInTheDocument();
  });
});