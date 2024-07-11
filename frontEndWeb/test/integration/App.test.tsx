// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import CreateUser from '../../src/CreateUser';
// import UserGatewayHttp from '../../src/infra/gateway/UserGatewayHttp';
// import AxiosAdapter from '../../src/infra/http/AxiosAdapter';

// function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

// test('Deve criar um usuário', async () => {
//   const userGateway = new UserGatewayHttp(new AxiosAdapter());

//   const { getByLabelText, getByText } = render(<CreateUser userGateway={userGateway} />);

//   fireEvent.change(getByLabelText('Nome'), { target: { value: 'John Doe' } });
//   fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@gmail.com' } });
//   fireEvent.change(getByLabelText('Telefone'), { target: { value: '41984498900' } });
//   fireEvent.click(getByText('Cadastrar usuário'));

//   await waitFor(() => {
//     expect(getByText('id')).toBeDefined();
//   });

//   await sleep(200);
// });
import React from 'react';
import { mount } from 'enzyme';
import CreateUser from '../../src/CreateUser';

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};
test('Cadastrar um usuário', async () => {
  const wrapper = mount(<CreateUser/>);
  wrapper.find('#name').simulate('change', { target: { value: 'Ana Maria' } });
  wrapper.find('#email').simulate('change', { target: { value: 'ana@gmail.com' } });
  wrapper.find('#phone').simulate('change', { target: { value: '41984498900' } });
  wrapper.find('#password').simulate('change', { target: { value: 'Bruna.24' } });
  wrapper.find('#confirmPassword').simulate('change', { target: { value: 'Bruna.24' } });
  wrapper.find('.create-button').simulate('Cadastrar Usuário');
  await sleep(200);

  expect(wrapper.find('.id').text()).toBeDefined();
});