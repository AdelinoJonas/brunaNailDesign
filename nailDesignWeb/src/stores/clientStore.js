import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import instance from 'services/api';

export function useClient() {
  const [clients, setClients] = useState([]);
  const [clientsMonth, setClientsMonth] = useState([]);
  const [client, setClient] = useState({});
  const [newClient, setNewClient] = useState({});
  const [clientLegal, setClientLegal] = useState(false);
  const [audiencesClient, setAudiencesClient] = useState([]);
  const [token, setToken, removeToken] = useLocalStorage('token');

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  async function loadClients() {
    try {
      const response = await instance.get('/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const localClients = response.data.concat();
      localClients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setClients(localClients);

      const localClientsMonth = localClients.filter(local => new Date(local.createdAt).getMonth() === thisMonth && new Date(local.createdAt).getFullYear() === thisYear);
      setClientsMonth(localClientsMonth);

    } catch (error) {
      console.log(error)
    }
  }

  async function handleGetClient(id) {

    try {
      const response = await instance.get(`/client/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      setClient(response.data)

      const localClient = response.data;
      const legal = (localClient.document).length > 11 ? true : false;
      setClientLegal(legal);
      setAudiencesClient(localClient.courtHearing);
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePostClient(newClient) {

    try {
      const response = await instance.post(`/client`, newClient, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.log(error.response)
    }
  }

  async function handleUpdateClient(clientUpdated, id) {
    try {
      const response = await instance.patch(`/client/${id}`, clientUpdated, {

        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleDeleteClient(id) {

    try {
      const response = await instance.delete(`/client/${id}`, {

        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (error) {
      console.log(error.response)
    }
  }

  return {
    clients,
    setClients,
    clientsMonth,
    setClientsMonth,
    loadClients,
    handleGetClient,
    handlePostClient,
    handleUpdateClient,
    handleDeleteClient,
    client,
    setClient,
    newClient,
    setNewClient,
    clientLegal,
    setClientLegal,
    audiencesClient,
  };
}
