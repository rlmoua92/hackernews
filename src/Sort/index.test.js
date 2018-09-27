import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sort from './index.js';

Enzyme.configure({ adapter: new Adapter() });

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