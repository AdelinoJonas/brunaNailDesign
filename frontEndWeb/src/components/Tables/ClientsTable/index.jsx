import React, { useEffect, useState } from "react";
import * as Sc from './styles';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const schedules = [
  {
    id: 1,
    cadastro: "05/11/2023",
    name: "João da Silva",
    email: 'jao@email.com',
    phone: "(41) 8888-8888"
  },
  {
    id: 2,
    cadastro: "08/12/2023",
    name: "Maria da Silva",
    email: 'maria@email.com',
    phone: "(41) 8888-8888"
  },
];

export default function ClientsTable() {
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
    },
    {
      title: "CADASTRO",
    },
    {
      title: "NAME",

    },
    {
      title: "E-MAIL",
    },
    {
      title: "TELEFONE",
    },
    {
      title: "OPÇÕES",
    },
  ];

  const rows = schedules.map((schedule) => (
    <tr key={schedule.id}>
      <td>{schedule.id}</td>
      <td>{schedule.cadastro}</td>
      <td>{schedule.name}</td>
      <td>{schedule.email}</td>
      <td>{schedule.phone}</td>
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
