import React from 'react';
import ScheduleTable from '../../components/Tables/ScheduleTable';
import * as Sc from './styles';

export default function Home() {
  return (
    <Sc.Container>
      <h1>AGENDAMENTOS</h1>
      <ScheduleTable/>
    </Sc.Container>  
  )
}