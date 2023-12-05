import React from 'react';
import * as Sc from './styles';
import { IoMdCalendar } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import logo from '../../../assets/logoColor.png';

export default function SideMenu() {
  return (
    <Sc.Container>
      <img src={logo} className='logo' alt="Bruna Nail design" />
      <Sc.LinkContainer>
        <Sc.LinkList>
          <span className="navigation">
          <IoMdCalendar /> Agendamentos
          </span> 
        </Sc.LinkList>
        <Sc.LinkList>
          <span className="navigation">
          <IoPeople /> Clientes
          </span>
        </Sc.LinkList>
        <Sc.LinkList>
          <span className="navigation">
          <FaHandHoldingHeart /> Serviços
          </span>
        </Sc.LinkList>
        <Sc.LinkList>
          <span className="navigation">
          <BsClock /> Horários
          </span>
        </Sc.LinkList>
      </Sc.LinkContainer>
      <span className='footerMenu'>&copy; &reg; Bruna Pereira 2024 </span>
    </Sc.Container>
  )
}
