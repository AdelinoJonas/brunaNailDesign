import { useEffect, useState } from 'react';
import instance from 'services/api';
import { useLocalStorage } from 'react-use';

export function useOffice() {
  const [office, setOffice] = useState({});
  const [usersOffice, setUsersOffice] = useState([]);

  const [token, setToken, removeToken] = useLocalStorage('token');

  function handlerOffice(data) {
    setOffice(data);
  }

  async function handlerGetOffice() {
    try {
      const response = await instance.get(`/office/infos`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      // handlerOffice(response.data)
      setOffice(response.data)

    } catch (error) {
      return error.message;
    }
  }

  async function handlerChangeOfficeData(data) {
    try {
      const response = await instance.patch('/office',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      handlerGetOffice(token)

    } catch (error) {
      console.log(error.message);
    }
  }

  async function handlerGetUsersOffice() {
    try {
      const response = await instance.get('/office/users',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      setUsersOffice(response.data);

    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    if (token) {
      handlerGetOffice()
    }
  }, [])

  return {
    handlerGetOffice,
    handlerChangeOfficeData,
    handlerGetUsersOffice,
    office,
    usersOffice
  }
}
