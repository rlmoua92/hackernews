import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';
import Button from '../Button/index.js';

const Sort = ({ 
  sortKey,
  activeSortKey, 
  onSort, 
  children,
  isSortReverse 
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey}
  );

  const sortIcon = 
    sortKey === activeSortKey
      ? isSortReverse
        ? <i className="fas fa-angle-down" style={{ paddingLeft: '5px' }}></i>
        : <i className="fas fa-angle-up" style={{ paddingLeft: '5px' }}></i>
      : null;

  return (
    <Button 
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}{sortIcon}
    </Button>
  );
};

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  activeSortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isSortReverse: PropTypes.bool.isRequired,
};

export default Sort;