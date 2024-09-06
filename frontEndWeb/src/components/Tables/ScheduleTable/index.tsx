import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import './styles.css';  // Import the CSS file instead of styled-components

interface Schedule {
  id: number;
  cadastro: string;
  data: string;
  hora: string;
  servico: string;
  cliente: string;
  telefone: string;
}

const schedules: Schedule[] = [
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

const SchedulesTable: React.FC = () => {
  const [orderBy, setOrderBy] = useState<string>("data");

  useEffect(() => {
    setOrderBy("data");
  }, []);

  const handleSort = (column: string) => {
    setOrderBy(column);
  };

  const columns = [
    { title: "ID" },
    { title: "CADASTRO" },
    { title: "DATA" },
    { title: "HORA" },
    { title: "SERVIÇO" },
    { title: "CLIENTE" },
    { title: "TELEFONE" },
    { title: "OPÇÕES" },
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
      <td>
        <CiEdit className="icon" />
        <RiDeleteBin5Line className="icon" />
      </td>
    </tr>
  ));

  return (
    <table className="schedules-table">
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
    </table>
  );
};

export default SchedulesTable;
