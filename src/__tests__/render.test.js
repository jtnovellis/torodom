/**
 * @jest-environment jsdom
 * @jsx torodom
 */

import { torodom, render } from '../index.js';

describe('render', () => {
  let root;
  beforeEach(() => {
    root = document.createElement('div');
  });

  it('Should to render a node child given a parent node', () => {
    const text = 'Hello World';
    render(root, text);
    expect(root.innerHTML).toEqual(text);
    expect(root.outerHTML).toEqual(`<div>${text}</div>`);
  });

  it('Should to render a tag node with children', () => {
    const element = <br />;
    render(root, element);
    expect(root.outerHTML).toEqual(`<div><br></div>`);
  });

  it('Should to render the attributes of a tag node', () => {
    const element = <h1 className='title'>Hello World</h1>;
    render(root, element);
    expect(root.outerHTML).toEqual(
      `<div><h1 class="title">Hello World</h1></div>`
    );
  });

  it('Should to render nested children', () => {
    const element = (
      <ul className='list'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    );
    render(root, element);
    expect(root.outerHTML).toEqual(
      `<div><ul class="list"><li>1</li><li>2</li><li>3</li></ul></div>`
    );
  });

  it('Should to render a component', () => {
    function Title({ text }) {
      return <h1 className='title'>{text}</h1>;
    }

    render(root, <Title text='Hello World' />);
    expect(root.outerHTML).toEqual(
      `<div><h1 class="title">Hello World</h1></div>`
    );
  });

  it('Should to render a tag button with an event', () => {
    const onClick = jest.fn();
    const element = <button onClick={onClick}>Click me</button>;
    render(root, element);
    root.firstChild.click();
    expect(onClick).toHaveBeenCalled();
  });
});
