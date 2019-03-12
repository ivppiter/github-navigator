import PropTypes from 'prop-types';
import React from 'react';

function Validation({ isValid }) {
  if(isValid === true){
    return <span role="img" aria-label="is valid">&#x2714;</span>;
  } else if(isValid === false) {
    return <span role="img" aria-label="is not valid">&#x274C;</span>;
  } else {
    return <span role="img" aria-label="validating">...</span>
  }
}

Validation.propTypes = {
  isValid: PropTypes.bool
}

export default Validation;
