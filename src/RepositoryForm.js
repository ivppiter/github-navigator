import PropTypes from 'prop-types';
import React from 'react';

function RepositoryForm(props) {
  const { repositoryId, repositoryList, onChange } = props;
  return (
    <div>
      <label htmlFor="repository-select">Repository:</label>
      <select value={repositoryId} id="repository-select" onChange={e => onChange(parseInt(e.target.value))}>
        <option value={0} key={0}>-- All repositories --</option>
        { repositoryList.map(({id, name}) => (
          <option value={id} key={id}>{name}</option>
        ))}
      </select>
    </div>
  )
}

RepositoryForm.propTypes = {
  repositoryId: PropTypes.number.isRequired,
  repositoryList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default RepositoryForm;
