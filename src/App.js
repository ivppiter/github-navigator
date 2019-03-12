import './App.css';

import React, { useState } from 'react';

import OrganizationForm from './OrganizationForm';
import Repositories from './Repositories';
import Repository from './Repository';
import RepositoryForm from './RepositoryForm';
import withOrganizationRepos from './withOrganizationRepos';

// import logo from './logo.svg';

function App(props) {
  const [selectedRepository, selectRepository] = useState(0);
  return (
    <div className="App">
      <header className="App-header" data-org-loaded={props.isValid} data-selected-id={selectedRepository}>
        {/*
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      */}
        <OrganizationForm {...props} />
        { selectedRepository > 0 && 
          props.repositoryList.length > 0 && 
          <RepositoryForm {...props} repositoryId={selectedRepository} onChange={selectRepository}/> 
        }
      </header>
      <section>
        { !selectedRepository && props.isValid && <Repositories {...props} onRepositoryClick={selectRepository}/>}
        { selectedRepository > 0 && <Repository {...props.repositoryList.find(({ id }) => id === selectedRepository)} /> }
      </section>
    </div>
  );
}

export default withOrganizationRepos(App);
