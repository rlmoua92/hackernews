import React, { Component } from 'react';
import PropTypes from 'prop-types';

const updateSearchTopStoriesState = (hits, page, nbPages) => (prevState) => {
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
      [searchKey]: { hits: updatedHits, page, nbPages }
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

const withInfiniteScroll = (Component) => {
  return (class WithInfiniteScroll extends Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }
  
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }
  
    onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
        && this.props.list.length
        && !this.props.isLoading
      ) {
        this.props.onPaginatedSearch();
      }
    }
  
    render() {
      return <Component {...this.props} />;
    }
  });
};

export {
  updateSearchTopStoriesState,
  dismissSearchResult,
  Loading,
  withLoading,
  withInfiniteScroll,
};