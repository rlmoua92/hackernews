import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { updateSearchTopStoriesState, dismissSearchResult } from './index.js';

Enzyme.configure({ adapter: new Adapter() });

describe('updateSearchTopStoriesState', () => {
  const prevState = {
    searchKey: 'redux',
    results: {
      'redux': { hits: ['abc'], page: 0 }
    }
  };
  const { searchKey, results } = prevState;
  const hits = ['def'];
  const page = 1;

  it('updates existing searchKey', () => {
    const updatedSearchStatefunc = updateSearchTopStoriesState(hits, page)
    const updatedSearchState = updatedSearchStatefunc(prevState);
    expect(updatedSearchState.results[searchKey].hits).toEqual(['abc','def']);
  });

  it('add new SearchKey', () => {
    const updatedSearchStatefunc = updateSearchTopStoriesState(hits, page)
    const updatedSearchState = updatedSearchStatefunc({ ...prevState, searchKey: 'react' });
    expect(updatedSearchState.results['react'].hits).toEqual(['def']);
  })
});

describe('dismissSearchResult', () => {
  const prevState = {
    searchKey: 'redux',
    results: {
      'redux': { hits: [
          {title: 'abc', objectID: 0},
          {title: 'def', objectID: 1},
          {title: 'ghi', objectID: 2},
        ], page: 0 }
    }
  };

  const { searchKey } = prevState;

  it('removes search result', () => {
    const dissmissSearchfunc = dismissSearchResult(0)
    const dissmissSearchState = dissmissSearchfunc(prevState);
    expect(dissmissSearchState.results[searchKey].hits).not.toContainEqual({ objectID: 0, title: expect.anything() });
  });

  it('removes nothing if no match', () => {
    const dissmissSearchfunc = dismissSearchResult(3)
    const dissmissSearchState = dissmissSearchfunc(prevState);
    expect(dissmissSearchState.results[searchKey].hits).toHaveLength(3);
  })
});