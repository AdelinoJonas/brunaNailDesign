import React from 'react';
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import Button from '../Button';
import './styles.css';

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id?: string }>();

  // Determine if back link should be hidden
  const backLinkHidden = pathname === '/home';
  
  // Determine the title based on the pathname
  let title: string = '';
  switch (pathname) {
    case '/home':
      title = `Olá, Bruna!`;
      break;
    case '/clients':
      title = 'Clientes';
      break;
    case '/schedules':
      title = 'Agendamentos';
      break;
    case '/services':
      title = 'Serviços';
      break;
    case `/schedules/${id}`:
      title = 'Agendamento';
      break;
    case `/clients/${id}`:
      title = 'Cliente';
      break;
    default:
      title = '';
  }

  return (
    <header className={`header ${backLinkHidden ? 'header--hidden' : ''}`}>
      <nav className="nav">
        <div className={`left-group ${backLinkHidden ? 'left-group--hidden' : ''}`}>
          <div>
            {['/schedules', '/clients', '/services'].includes(pathname) && (
              <button
                className={`back-link ${backLinkHidden ? 'back-link--hidden' : ''}`}
                onClick={() => navigate(-1)}
              >
                <MdArrowBackIosNew size={24} color="#555555" />
              </button>
            )}
            <h1 className="title">{title}</h1>
          </div>
        </div>
        <div className={`right-group ${['/home', '/schedules', '/clients', '/services'].includes(pathname) ? 'right-group--responsive' : ''}`}>
          {pathname === '/home' && (
            <Button plus medium title="Agendamento" />
          )}
          {pathname === '/schedules' && (
            <Button plus medium title="Agendamento" />
          )}
          {pathname === '/clients' && (
            <Button plus medium title="Cliente" />
          )}
          {pathname === '/services' && (
            <Button plus medium title="Serviço" />
          )}
          <SearchInput />
        </div>
      </nav>
    </header>
  );
}
