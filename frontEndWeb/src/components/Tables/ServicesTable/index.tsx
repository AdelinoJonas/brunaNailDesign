import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import './styles.css';  // Import the CSS file instead of styled-components

interface Schedule {
  id: number;
  service: string;
  description: string;
  time: string;
  price: string;
  image: string;
  is_course: boolean;
}

const schedules: Schedule[] = [
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
    { title: "IMAGEM" },
    { title: "SERVIÇOS" },
    { title: "DESCRIÇÃO" },
    { title: "DURAÇÃO" },
    { title: "PREÇO" },
    { title: "OPÇÕES" },
  ];

  const rows = schedules.map((schedule) => (
    <tr key={schedule.id}>
      <td>{schedule.id}</td>
      <td><img src={schedule.image} alt={schedule.service} className="image" /></td>
      <td className="service">{schedule.service}</td>
      <td className="description">{schedule.description}</td>
      <td>{schedule.time}</td>
      <td>{schedule.price}</td>
      <td>
        <CiEdit className="icon" />
        <RiDeleteBin5Line className="iconRight" />
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
