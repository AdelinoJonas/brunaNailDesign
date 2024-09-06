import { useCallback, useEffect, useState } from "react";
// import { useLocalStorage } from "react-use";
import instance from "services/api";


export function useAdminUser() {
  // const [token, setToken, removeToken] = useLocalStorage('token');

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [activeOffice, setActiveOffice] = useState([]);
  const [inactiveOffice, setInactiveOffice] = useState([]);
  const [statusResponse, setStatusResponse] = useState();
  // const [message, setMessage] = useState('');
  // const [showToast, setShowToast] = useState(null);


  async function handleNewUser(newUser, token) {

    try {
      const response = await instance.post('/admin/user',
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setStatusResponse(response.request.status);
      setMessage('Usuário cadastrado com sucesso!');
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function handleGetUserByStatus(status, token) {
    try {
      const response = await instance.get(`/admin/users/${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (status) {
        setActiveOffice(response.data)
        return response.data;
      }

      setInactiveOffice(response.data);
      setStatusResponse(response.request.status);
      setMessage('Status atualizado com sucesso!');
      return response;

    } catch (error) {
      return error
    }
  }

  async function handlerGetUsers(token) {
    try {
      const response = await instance.get('/admin/users', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      );

      let localOffices = response.data.sort((a, b) => {
        return new Date(a.due_date) - new Date(b.due_date)
      })

      setUsers(localOffices);
    } catch (error) {
      return error.response.message;
    }
  }

  async function handleGetUserById(userId, token) {

    try {
      const response = await instance.get(`/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentUser(response.data);

      return response;

    } catch (error) {
      return error.response.message;
    }
  }

  async function handleUpdateUser(user, token) {
    try {
      const response = await instance.patch(`admin/user/${user.id}`,
        {
          ...user,
          office_is_active: `${user.office_is_active}`
        }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatusResponse(response.request.status);
      setMessage('Usuário atualizado com sucesso!');
      return response
    } catch (error) {

      return error.response.message;
    }
  }

  // useEffect(() => {
  //   handlerGetUsers()
  // }, [])

  return {
    handleNewUser,
    handlerGetUsers,
    handleGetUserById,
    handleGetUserByStatus,
    handleUpdateUser,
    users,
    currentUser,
    activeOffice,
    inactiveOffice,
    statusResponse,
    message,
    // showToast,
    // setShowToast
  }
}

