import React, { useEffect, useState } from "react";
import * as Sc from './styles';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const schedules = [
  {
    id: 1,
    cadastro: "23/07/2022",
    data: "23/02/2023",
    hora: "08:00",
    servico: "Manutenção",
    cliente: "João da Silva",
    telefone: "(41) 9999-9999",
  },
  {
    id: 2,
    cadastro: "08/12/2022",
    data: "03/01/2023",
    hora: "12:00",
    servico: "Instalação",
    cliente: "Maria da Silva",
    telefone: "(41) 8888-8888",
  },
];

export default function SchedulesTable() {
  const [orderBy, setOrderBy] = useState("data");

  useEffect(() => {
    setOrderBy("data");
  }, []);

  function handleSort(column) {
    setOrderBy(column);
  };

  const columns = [
    {
      title: "ID",
      width: 100,
    },
    {
      title: "CADASTRO",
      width: 100,
    },
    {
      title: "DATA",
      width: 150,
      sort: (a, b) => a[orderBy] - b[orderBy],
    },
    {
      title: "HORA",
      width: 100,
    },
    {
      title: "SERVIÇO",
      width: 200,
    },
    {
      title: "CLIENTE",
      width: 200,
    },
    {
      title: "TELEFONE",
      width: 150,
    },
    {
      title: "OPÇÕES",
      width: 100,
    },
  ];

  const rows = schedules.map((schedule) => (
    <tr key={schedule.id}>
      <td>{schedule.id}</td>
      <td>{schedule.cadastro}</td>
      <td>{schedule.data}</td>
      <td>{schedule.hora}</td>
      <td>{schedule.servico}</td>
      <td>{schedule.cliente}</td>
      <td>{schedule.telefone}</td>
      <td >
        <CiEdit className="icon"/>
        <RiDeleteBin5Line className="icon" />
      </td>
    </tr>
  ));

  return (
    <Sc.Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Sc.Table>
  );
};
