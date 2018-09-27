import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index.js';

Enzyme.configure({ adapter: new Adapter() });

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