import PropTypes from 'prop-types';
import React from 'react';

import Validation from './Validation';

function OrganizationForm(props) {
  const { onChange, organization } = props;

  return (
    <div>
      <label htmlFor="organization-name" style={{ marginRight: '5px' }}>Organization:</label>
      <input id="organization-name" value={organization}  style={{marginRight: '10px', fontSize:'25px'}} onChange={e => onChange(e.target.value)} />
      { organization && <Validation {...props} /> }
    </div>
  )
}

OrganizationForm.propTypes = {
  ...Validation.propTypes,
  organization: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default OrganizationForm;
