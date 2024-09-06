import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function SearchInput() {
  const clients: Client[] = [
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

  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);

  function onChange(valueInput: string) {
    setShowList(!!valueInput);
    setFilter(valueInput);
  }

  function onSelectItem(client: Client) {
    setFilter(client.name);
    navigate(`clients/${client.id}`);
    setShowList(false);
  }

  function clearSearchInput() {
    onChange('');
  }

  const filteredList = clients.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <span className="searchIcon">🔍</span>
      <span
        className={`closeIcon ${filter.length ? 'show' : ''}`}
        onClick={clearSearchInput}
      >
        &times;
      </span>
      <input
        type="text"
        className={`input ${showList ? 'showList' : ''}`}
        placeholder="Buscar clientes"
        onChange={(e) => onChange(e.target.value)}
        value={filter}
      />

      <div className="dropdownList">
        <ul className={`listItems ${showList ? '' : 'hidden'}`}>
          <li className="item"><hr /></li>
          {filteredList.length > 0 ? (
            filteredList.slice(0, 5).map((client) => (
              <li
                key={client.id}
                className="item"
                onClick={() => onSelectItem(client)}
              >
                {client.name}
              </li>
            ))
          ) : (
            <li className="item"><br /></li>
          )}
        </ul>
      </div>
    </div>
  );
}
