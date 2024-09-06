import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useStores } from 'stores';
import * as Sc from './styles';

export function SearchInput() {
  const clients = [
    {
      id: 1,
      name: "João da Silva",
      email: "joao.silva@example.com",
      phone: "(11) 99999-9999",
    },
    {
      id: 2,
      name: "Maria do Carmo",
      email: "maria.carmo@example.com",
      phone: "(21) 88888-8888",
    },
    {
      id: 3,
      name: "José Pereira",
      email: "jose.pereira@example.com",
      phone: "(31) 77777-7777",
    },
  ];

  const navigate = useNavigate()
  const [filter, setFilter] = useState('');
  const [showList, setShowList] = useState(false);

  // const { clientStore } = useStores();
  // const { clients } = clientStore;

  function onChange(valueInput) {
    if (!valueInput) {
      setShowList(false);
    } else {
      setShowList(true)
    }
    setFilter(valueInput)
  }

  function onSelectItem(client) {
    setFilter(client.name)
    navigate(`clients/${client.id}`)
    setShowList(false)
  }

  function ClearSearchInput() {
    onChange('')
  }

  const filteredList = clients.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <Sc.Container>
      <Sc.SearchIcon />
      <Sc.CloseIcon
        hidden={filter.length}
        onClick={ClearSearchInput}
      />
      <Sc.Input
        type="text"
        placeholder="Buscar clientes"
        onChange={e => onChange(e.target.value)}
        value={filter}
        showList={showList}
      />

      <Sc.DropdownList>
        <Sc.ListItems 
        hidden={!showList}
        >
          <Sc.Item>
            <hr />
          </Sc.Item>
          {filteredList.length > 0 ? filteredList.map((client, index) => {
            if (index < 5) {
              return (
                <Sc.Item
                  key={client.id}
                  onClick={() => onSelectItem(client)}>
                  {client.name}
                </Sc.Item>
              )
            }
          })
            :

            <Sc.Item>
              <br />
            </Sc.Item>
          }
        </Sc.ListItems>
      </Sc.DropdownList>
    </Sc.Container>


  )
}
