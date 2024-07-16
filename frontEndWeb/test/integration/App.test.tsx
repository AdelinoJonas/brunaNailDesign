import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateUser from '../../src/CreateUser';
import axios from 'axios';
import UserGatewayHttp from '../../src/infra/gateway/UserGatewayHttp';

jest.mock('axios');
it('renders input fields and updates state correctly', () => {
  const userGateway = new UserGatewayHttp();
  const { getByPlaceholderText } = render(<CreateUser userGateway={userGateway}/>);
  const nameInput = getByPlaceholderText('Digite seu nome') as HTMLInputElement;
  const emailInput = getByPlaceholderText('Digite seu e-mail') as HTMLInputElement;
  const phoneInput = getByPlaceholderText('Digite seu Telefone') as HTMLInputElement;
  const passwordInput = getByPlaceholderText('Digite uma senha') as HTMLInputElement;
  const confirmPasswordInput = getByPlaceholderText('Confirme sua senha') as HTMLInputElement;    
  fireEvent.change(nameInput, { target: { value: 'Test User' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '123456789' } });
  fireEvent.change(passwordInput, { target: { value: 'Password.123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Password.123' } });
  expect(nameInput.value).toBe('Test User');
  expect(emailInput.value).toBe('test@example.com');
  expect(phoneInput.value).toBe('123456789');
  expect(passwordInput.value).toBe('Password.123');
  expect(confirmPasswordInput.value).toBe('Password.123');
});

it('Deve cadastrar um usuário', async () => {
  const userGateway = new UserGatewayHttp();
  const mockedUserId = '2';
  (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
    data: { user_id: mockedUserId },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  });
  render(<CreateUser userGateway={userGateway}/>);
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
    expect(screen.getByText(mockedUserId)).toBeInTheDocument();
  });
  expect(screen.getByText('Cadastrar Usuário')).toBeInTheDocument();
});