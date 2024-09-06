import React from 'react';
import ScheduleTable from '../../components/Tables/ScheduleTable';
import * as Sc from './styles';
import ClientsTable from '../../components/Tables/ClientsTable';
import ServicesTable from '../../components/Tables/ServicesTable';

export default function Home() {
  return (
    <Sc.Container>
      <h1>AGENDAMENTOS DO DIA</h1>
      <ScheduleTable/>
      <h1>CLIENTES RECENTES</h1>
      <ClientsTable/>
      <h1>CURSOS ABERTOS</h1>
      <ServicesTable/>
    </Sc.Container>  
  )
}