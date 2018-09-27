import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table, Sort, updateSearchTopStoriesState, dismissSearchResult } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Search', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search onChange={() => console.log("Change")} onSubmit={() => console.log("Submit")}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search onChange={() => console.log("Change")} onSubmit={() => console.log("Submit")}>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => console.log("Give Me More")}>Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has text', () => {
    const element = shallow(
      <Button onClick={() => console.log("Give Me More")}>Give Me More</Button>
    );

    expect(element.find('button').text()).toBe("Give Me More");
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => console.log("Give Me More")}>Give Me More</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} onDismiss={() => console.log("Dismiss")} />, div);
  });

  it('shows two items in list', () => {
    const element = shallow(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );

    expect(element.find('.table-row').length).toBe(2);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Sort', () => {
  const props = {
    sortKey: 'TITLE',
    activeSortKey: 'TITLE',
    isSortReverse: false,
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sort {...props} onSort={() => console.log("SORT BY TITLE")}>Title</Sort>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Sort {...props} onSort={() => console.log("SORT BY TITLE")}>Title</Sort>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

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