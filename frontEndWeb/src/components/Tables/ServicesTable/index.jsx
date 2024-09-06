import React, { useEffect, useState } from "react";
import * as Sc from './styles';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const schedules = [
  {
    id: 1,
    service: "Banho de Gel",
    description: "Banho com gel comprado na lojinha da esquina.",
    time: "2 horas",
    price: "185,00",
    image: "nail.jpg",
    is_course: false
  },
  {
    id: 2,
    service: "Esmaltação com gel da Indonésia",
    description: "Esmaltação com gel produzido pelas freiras quimicas, cegas e surdas das profundidades da Indonésia.",
    time: "2 horas",
    price: "385,00",
    image: "nail.jpg",
    is_course: true
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
      title: "ID"
    },
    {
      title: "IMAGEM"
    },
    {
      title: "SERVIÇOS"
    },
    {
      title: "DESCRIÇÃO"
    },
    {
      title: "DURAÇÃO"
    },
    {
      title: "PREÇO"
    },
    {
      title: "OPÇÕES"
    },
  ];

  const rows = schedules.map((schedule) => (
    <tr key={schedule.id}>
      <td>{schedule.id}</td>
      <td>{schedule.image}</td>
      <td className="service">{schedule.service}</td>
      <td className="description">{schedule.description}</td>
      <td>{schedule.time}</td>
      <td>{schedule.price}</td>
      <td >
        <CiEdit className="icon"/>
        <RiDeleteBin5Line className="iconRight" />
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
