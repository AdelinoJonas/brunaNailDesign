import { useState } from 'react';
import instance from 'services/api';

export function useForgotPassword() {

  const [errorResponse, setErrorResponse] = useState('');
  const [statusResponse, setStatusResponse] = useState();
  const [message, setMessage] = useState('');

  async function handlerSendEmail({email}) {

    try {
      let response = await instance.post(`/forgot`, {email},{});

      setMessage(response.data.message);
      setStatusResponse(response.request.status);

    } catch (error) {

      setErrorResponse(error.response.status);
      setMessage(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async function handlerChangePassword(repeatPassword,newPassword, token) {

    // if (newPassword !== repeatPassword) {
    //   setErrorResponse('As senhas não coincidem');
    //   setNewPassword(newPassword);
    //   return;
    // }

    try {

      const response = await instance.patch(`/user/password`,
          {
              password: newPassword
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      )

      setMessage(response.data.message);
      setStatusResponse(response.request.status);

    } catch (error) {

      setErrorResponse(error.response.status);
      setMessage(error.response.data.message);
      throw new Error(error.response.data.message);

    }

}

  return {
    handlerSendEmail,
    handlerChangePassword,
    statusResponse,
    errorResponse,
    message
  };
}
