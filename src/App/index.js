import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './index.css';
import Button from '../Button/index.js'
import Search from '../Search/index.js'
import Table from '../Table/index.js'
import { dismissSearchResult, updateSearchTopStoriesState, withLoading, withInfiniteScroll } from '../util/index.js';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const ButtonWithLoading = withLoading(Button);
const TableWithInfiniteScroll = withInfiniteScroll(Table);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page, nbPages } = result;
    console.log(nbPages);
    this.setState(updateSearchTopStoriesState(hits, page, nbPages));
  }

  fetchSearchTopStories(searchTerm, page=0) {
    const { results } = this.state;
    console.log(this.state)
    if (!results || (results[searchTerm] && results[searchTerm].page < results[searchTerm].nbPages - 1) || !results[searchTerm]) {
      this.setState({ isLoading: true });
  
      axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(result => this._isMounted && this.setSearchTopStories(result.data))
        .catch(error => this._isMounted && this.setState({ error }));
    }
  }

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState(prevState => {
      return {
        searchKey: prevState.searchTerm
      }
    });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss(id) {
    this.setState(dismissSearchResult(id));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState(prevState => {
      return {
        searchKey: prevState.searchTerm
      }
    });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  render() {
    const { 
      results, 
      searchTerm,
      searchKey,
      error,
      isLoading,
    } = this.state
    
    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : <TableWithInfiniteScroll
            list={list}
            onDismiss={this.onDismiss}
            isLoading={isLoading}
            onPaginatedSearch={() => this.fetchSearchTopStories(searchKey, page + 1)}
          />
        }
        <div className="interactions">
          { <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
              >
              More
            </ButtonWithLoading>
          }
        </div>
      </div>
    );
  }
}

export default App;