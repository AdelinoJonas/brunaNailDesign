import { useState } from 'react';
import { useLocalStorage } from 'react';
// import instance from '../services/api';

export function useContextUser() {
  const [token, setToken, removeToken] = useLocalStorage('token');
  const [userData, setUserData, removerUserData] = useLocalStorage('userData');
  const [localUser, setLocalUser] = useState(null);

  function handleClearUserData() {
    removeToken();
    removerUserData();
  }

  function handleLocalUser(user = {}) {
    setLocalUser(user);
  }

  // async function fetchUser() {
  //   if (token) {
  //     try {
  //       const response = await instance.get('/user', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });

  //       handleLocalUser(response.data.infos);
  //     } catch (error) {
  //       console.log(error.response.message);
  //     }
  //   }
  // }

  // async function handlerChangeUserData(data) {
  //   try {
  //     await instance.patch('/user/infos',
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })

  //     fetchUser();

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // async function handlerChangeSignature(data) {
  //   const { id, is_authorized } = data;
  //   try {
  //     const response = await instance.patch(`/user/authorized/${id}`,
  //       { is_authorized },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     )
  //   }
  //   catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // async function handlerDeleteUser(id) {
  //   try {
  //     const response = await instance.patch(`/user/status/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     )
  //   } catch (error) {
  //     console.log(error);
  //     return error.message;
  //   }
  // }

  return {
    token,
    setToken,
    // userData,
    // setUserData,
    // localUser,
    // handleLocalUser,
    // handleClearUserData,
    // fetchUser,
    // handlerChangeUserData,
    // handlerChangeSignature,
    // handlerDeleteUser
  };
}

