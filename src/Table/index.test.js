import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table, { SORTS } from './index.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: 'c', num_comments: 1, points: 2, objectID: 'y' },
      { title: '3', author: 'a', num_comments: 1, points: 2, objectID: 'x' },
      { title: '2', author: 'b', num_comments: 1, points: 2, objectID: 'z' },
    ],
    sortKey: 'NONE',
    isSortReverse: false,
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} onDismiss={() => console.log("Dismiss")} />, div);
  });

  it('shows three items in list', () => {
    const element = mount(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );

    expect(element.find('.table-row').length).toBe(3);
  });

  it('shows sorted list', () => {
    const element = mount(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );
    element.find('button').first().simulate('click');

    expect(element.state().sortKey).toBe('TITLE');
    expect(element.state().isSortReverse).toBe(false);
  });

  it('shows reverse sorted list', () => {
    const element = mount(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );
    element.find('button').first().simulate('click');
    element.find('button').first().simulate('click');

    expect(element.state().sortKey).toBe('TITLE');
    expect(element.state().isSortReverse).toBe(true);
  });

  it('shows unsorted list', () => {
    const element = mount(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );
    element.find('button').first().simulate('click');
    element.find('button').first().simulate('click');
    element.find('button').first().simulate('click');

    expect(element.state().sortKey).toBe('NONE');
    expect(element.state().isSortReverse).toBe(false);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props} onDismiss={() => console.log("Dismiss")} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});