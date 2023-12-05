import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const schedules = [
  {
    id: 1,
    cadastro: "23/07/2023",
    data: "03/03/2023",
    hora: "08:00",
    servico: "Manutenção",
    cliente: "João da Silva",
    telefone: "(41) 9999-9999",
  },
  {
    id: 2,
    cadastro: "08/12/2023",
    data: "03/03/2023",
    hora: "12:00",
    servico: "Instalação",
    cliente: "Maria da Silva",
    telefone: "(41) 8888-8888",
  },
];

const SchedulesTable = () => {
  const [orderBy, setOrderBy] = useState("data");

  useEffect(() => {
    setOrderBy("data");
  }, []);

  const handleSort = (column) => {
    setOrderBy(column);
  };

  const columns = [
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
      <td>{schedule.data}</td>
      <td>{schedule.hora}</td>
      <td>{schedule.servico}</td>
      <td>{schedule.cliente}</td>
      <td>{schedule.telefone}</td>
      <Options >
        <CiEdit />
        <RiDeleteBin5Line />
      </Options>
    </tr>
  ));

  return (
    <Table>
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
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 3rem;

  td {
    padding: 1rem;
    text-align: center;
  }

  th {
    background-color: #f1f1f1;
  }

  thead {
    background-color: blue;
  }

  @media (max-width: 768px) {
    table {
      width: 100%;
    }
  }
`;

const Options = styled.td`
  gap: 1rem;
`;

export default SchedulesTable;