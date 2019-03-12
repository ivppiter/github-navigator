import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TableHeader from './TableHeader';

function Repositories({ repositoryList, onRepositoryClick }) {
  const [ sortBy, setSortBy ] = useState('mostPopular');

  return (
    <table className="repository-table">
      <thead>
        <tr>
          <TableHeader text="Name" value={sortBy} ascendingValue="nameAscending" descendingValue="nameDescending"
            onClick={() => setSortBy(sortBy === 'nameAscending' ? 'nameDescending' : 'nameAscending')}/>
          <TableHeader text="Last Update" value={sortBy} ascendingValue="leastRecentCommit" descendingValue="mostRecentCommit"
            onClick={() => setSortBy(sortBy === 'mostRecentCommit' ? 'leastRecentCommit' : 'mostRecentCommit')}/>
          <TableHeader text="Fork Count" value={sortBy} ascendingValue="leastPopular" descendingValue="mostPopular"
            onClick={() => setSortBy(sortBy === 'mostPopular' ? 'leastPopular' : 'mostPopular')}/>
          <TableHeader text="Language" value={sortBy} ascendingValue="languageAscending" descendingValue="languageDescending"
          onClick={() => setSortBy(sortBy === 'languageAscending' ? 'languageDescending' : 'languageAscending')}/>
        </tr>
      </thead>
      <tbody>
        { repositoryList.length < 1 && <NoRepositories/> }
        { repositoryList.sort(sorting[sortBy]).map(r => (
          <tr id={r.id} key={r.id}>
            <td onClick={() => onRepositoryClick(r.id)}>
              <span>{r.name}</span>
            </td>
            <td><span>{new Date(r.pushed_at).toDateString()}</span></td>
            <td><span>{r.forks_count}</span></td>
            <td><span>{r.language || ''}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Repositories.propTypes = {
  onRepositoryClick: PropTypes.func.isRequired,
  repositoryList: PropTypes.arrayOf(PropTypes.shape({
    forks_count: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    language: PropTypes.string,
    name: PropTypes.string.isRequired,
    pushed_at: PropTypes.string.isRequired,
  }))
}

export default Repositories;

const sorting = {
  mostPopular: (a, b) => b.forks_count - a.forks_count,
  leastPopular: (a, b) => a.forks_count - b.forks_count,
  languageAscending: (a, b) => {
    if(a.language && b.language) { 
      return a.language.localeCompare(b.language)
    } else if(a.language) {
      return 1;
    } else if(b.language) {
      return -1;
    } else {
      return 0;
    }
  },
  languageDescending: (a, b) => {
    if(b.language && a.language) { 
      return b.language.localeCompare(a.language)
    } else if(a.language) {
      return -1;
    } else if(b.language) {
      return 1;
    } else {
      return 0;
    }
  },
  nameAscending: (a, b) => a.name.localeCompare(b.name),
  nameDescending: (a, b)  => b.name.localeCompare(a.name),
  mostRecentCommit: (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
  leastRecentCommit: (a, b) => Date.parse(a.pushed_at) - Date.parse(b.pushed_at)
}

const NoRepositories = () => (
  <tr>
    <td colSpan={4}>
      <span>No repository in this organization</span>
    </td>
  </tr>
)
