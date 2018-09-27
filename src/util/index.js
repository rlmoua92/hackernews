import React, { Component } from 'react';
import PropTypes from 'prop-types';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
}

const dismissSearchResult = (id) => (prevState) => {
  const { searchKey, results } = prevState;
  const { hits, page } = results[searchKey];
  const isNotId = item => item.objectID !== id;
  const updatedHits = hits.filter(isNotId);

  return {
    results: { 
      ...results,
      [searchKey]: { hits: updatedHits, page }
    }
  };
}

const Loading = () => {
  return (
    <div><i className="fas fa-spinner"></i></div>
  );
};

const withLoading = (Component) => ({ isLoading, ...rest }) => {
  return (
    isLoading
      ? <Loading />
      : <Component { ...rest } />
  );
};

export {
  updateSearchTopStoriesState,
  dismissSearchResult,
  Loading,
  withLoading,
};