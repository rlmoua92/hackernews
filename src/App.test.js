import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';

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
    ]
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