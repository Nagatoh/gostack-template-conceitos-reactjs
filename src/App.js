import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
      // console.log(response);
    });
  }, []);


  async function handleAddRepository() {
    //projects.push(`Novo projeto ${Date.now()}`);
    //"..."=>spreadOperator recria o vetor com as mesmas informações
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Humberto Nagato'
    });
    const project = response.data
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setProjects(projects.filter(project=>project.id!==id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project =>
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
