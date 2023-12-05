import React from 'react';
import * as Sc from './styles';
import { AiOutlineHome } from "react-icons/ai";
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
          <AiOutlineHome className='img' />
          <span className="navigation">
           Home
          </span> 
        </Sc.LinkList>
        <Sc.LinkList>
          <IoMdCalendar className='img'/>
          <span className="navigation">
           Agendamentos
          </span> 
        </Sc.LinkList>
        <Sc.LinkList>
          <IoPeople className='img'/>
          <span className="navigation">
           Clientes
          </span>
        </Sc.LinkList>
        <Sc.LinkList>
          <FaHandHoldingHeart className='img'/>
          <span className="navigation">
           Serviços
          </span>
        </Sc.LinkList>
        <Sc.LinkList>
          <BsClock className='img'/>
          <span className="navigation">
           Horários
          </span>
        </Sc.LinkList>
      </Sc.LinkContainer>
      <span className='footerMenu'>&copy; &reg; Bruna Pereira 2024 </span>
    </Sc.Container>
  )
}
