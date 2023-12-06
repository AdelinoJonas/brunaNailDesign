import React from 'react';
import * as Sc from './styles';
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
    <Sc.Container>
      <img src={logo} className='logo' alt="Bruna Nail design" />
      <Sc.LinkContainer>
        <Sc.LinkList onClick={()=>navigate('/home')}>
          <AiOutlineHome className='img' />
          <span className="navigation" >
           Home
          </span> 
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/schedules')}>
          <IoMdCalendar className='img'/>
          <span className="navigation">
           Agendamentos
          </span> 
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/clients')}>
          <IoPeople className='img'/>
          <span className="navigation">
           Clientes
          </span>
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/services')}>
          <FaHandHoldingHeart className='img'/>
          <span className="navigation">
           Serviços
          </span>
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/freeTime')}>
          <BsClock className='img'/>
          <span className="navigation">
           Horários
          </span>
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/contact')}>
          <GrContact className='img'/>
          <span className="navigation">
           Contato
          </span>
        </Sc.LinkList>
        <Sc.LinkList onClick={()=>navigate('/')}>
          <SlLogout className='img'/>
          <span className="navigation">
           Sair
          </span>
        </Sc.LinkList>
      </Sc.LinkContainer>
      <span className='footerMenu'>&copy; &reg; Bruna Pereira 2024 </span>
    </Sc.Container>
  )
}
