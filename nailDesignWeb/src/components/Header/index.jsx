import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import Button from '../Button';
import * as Sc from './styles';

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const backLinkHidden = pathname === '/home' ? true : false;
  let title = pathname === '/agendamentos' && 'agendamentos';

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
  }

  return (
    <Sc.Header>
      <Sc.Nav>
      <Sc.LeftGroup>
        <div>
          {pathname === '/schedules' &&
            <Sc.BackLink onClick={() => navigate(-1)}>
              <MdArrowBackIosNew
                size={24}
                color="#555555"
              />
            </Sc.BackLink>
          }
          {pathname === '/clients' &&
            <Sc.BackLink onClick={() => navigate(-1)}>
              <MdArrowBackIosNew
                size={24}
                color="#555555"
              />
            </Sc.BackLink>
          }
          {pathname === '/services' &&
            <Sc.BackLink onClick={() => navigate(-1)}>
              <MdArrowBackIosNew
                size={24}
                color="#555555"
              />
            </Sc.BackLink>
          }
          <Sc.Title>{title}</Sc.Title>
        </div>
      </Sc.LeftGroup>
      <Sc.RightGroup>
        {pathname === '/home' &&
          <Button
            plus
            medium= "true"
            title="Agendamento"
            // onClick={() => { handleToggleModal('newAudience') }}
          />
        }
        {pathname === '/schedules' &&
          <Button
          plus
          medium= "true"
          title="Agendamento"
          // onClick={() => { handleToggleModal('newAudience') }}
        />
        }
        {pathname === '/clients' &&
          <Button
          plus
          medium= "true"
          title="Cliente"
          // onClick={() => { handleToggleModal('newAudience') }}
        />
        }
        {pathname === '/services' &&
          <Button
          plus
          medium= "true"
          title="Serviço"
          // onClick={() => { handleToggleModal('newAudience') }}
        />
        }
        <SearchInput />
      </Sc.RightGroup>
      </Sc.Nav>
    </Sc.Header>
  )
}
