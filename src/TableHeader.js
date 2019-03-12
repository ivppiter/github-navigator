import PropTypes from 'prop-types';
import React from 'react';

function TableHeader(props){
  const { ascendingValue, descendingValue, onClick, text, value,  } = props;
  return (
    <th onClick={onClick}>
      <span>{text}</span>
      { value === ascendingValue && <span role="img">&#x2191;</span> }
      { value === descendingValue && <span role="img">&#x2193;</span> }
    </th>
  );
}

TableHeader.propTypes = {
  ascendingValue: PropTypes.string,
  descendingValue: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default TableHeader;
