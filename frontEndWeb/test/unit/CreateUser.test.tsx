import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateUser from '../../src/CreateUser';
import UserGatewayHttp from '../../src/infra/gateway/UserGatewayHttp';
import AxiosAdapter from '../../src/infra/http/AxiosAdapter';

jest.mock('axios');
test('renders input fields and updates state correctly', () => {
  const httpClient = new AxiosAdapter();
  const userGateway = new UserGatewayHttp(httpClient);
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