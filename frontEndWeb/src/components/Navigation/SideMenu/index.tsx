import React from 'react';
import './styles.css';
import { AiOutlineHome } from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { BsClock } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import logo from '../../../assets/logoColor.png';
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src={logo} className='logo' alt="Bruna Nail design" />
      <ul className="linkContainer">
        <li className="linkList" onClick={() => navigate('/home')}>
          <AiOutlineHome className='img' />
          <span className="navigation">Home</span>
        </li>
        <li className="linkList" onClick={() => navigate('/schedules')}>
          <IoMdCalendar className='img' />
          <span className="navigation">Agendamentos</span>
        </li>
        <li className="linkList" onClick={() => navigate('/clients')}>
          <IoPeople className='img' />
          <span className="navigation">Clientes</span>
        </li>
        <li className="linkList" onClick={() => navigate('/services')}>
          <FaHandHoldingHeart className='img' />
          <span className="navigation">Serviços</span>
        </li>
        <li className="linkList" onClick={() => navigate('/freeTime')}>
          <BsClock className='img' />
          <span className="navigation">Horários</span>
        </li>
        <li className="linkList" onClick={() => navigate('/contact')}>
          <GrContact className='img' />
          <span className="navigation">Contato</span>
        </li>
        <li className="linkList" onClick={() => navigate('/')}>
          <SlLogout className='img' />
          <span className="navigation">Sair</span>
        </li>
      </ul>
      <span className='footerMenu'>&copy; &reg; Bruna Pereira 2024 </span>
    </div>
  );
}
