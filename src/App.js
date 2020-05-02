import React, { useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [repositories]);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Projeto ${Date.now()}`,
      url: `https://github.com/hellwinkel/${Date.now()}`,
      techs: ['Tech 1', 'Tech 2']
    });

    setRepositories([...repositories], response.data);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
