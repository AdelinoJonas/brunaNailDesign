import React from 'react';
import ClientsTable from '../../components/Tables/ClientsTable';
import './styles.css';  // Import the CSS file instead of styled-components

const Clients: React.FC = () => {
  return (
    <div className="container">
      <ClientsTable />
    </div>
  );
}

export default Clients;
