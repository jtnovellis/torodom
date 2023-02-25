/**
 * @jest-environment jsdom
 * @jsx jtn
 */

import { jtn, updateNode, render } from '../index.js';

describe('updateNode', () => {
  let root;
  beforeEach(() => {
    root = document.createElement('article');
  });

  it('Should to add a new Node', () => {
    const oldNode = undefined;
    const newNode = <h1>Hello World</h1>;
    updateNode(root, oldNode, newNode);
    expect(root.outerHTML).toEqual(`<article><h1>Hello World</h1></article>`);
  });

  it('Should to remove a Node', () => {
    const oldNode = <h1>Hello World</h1>;
    const newNode = undefined;
    render(root, oldNode);
    updateNode(root, oldNode, newNode);
    expect(root.outerHTML).toEqual(`<article></article>`);
  });

  it('Should render nestet nodes', () => {
    const oldNode = (
      <ul className='list'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    );
    const newNode = (
      <ul className='list'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    );
    render(root, oldNode);
    updateNode(root, oldNode, newNode);
    expect(root.outerHTML).toEqual(
      `<article><ul class="list"><li>1</li><li>2</li><li>3</li><li>4</li></ul></article>`
    );
  });

  it('Should to update a Node', () => {
    const oldNode = <h1>Hello World</h1>;
    const newNode = <h1>Hello World Updated</h1>;
    render(root, oldNode);
    updateNode(root, oldNode, newNode);
    expect(root.outerHTML).toEqual(
      `<article><h1>Hello World Updated</h1></article>`
    );
  });

  it('Should to update a component', () => {
    function User({ name }) {
      return <h1>{name}</h1>;
    }
    const oldNode = <User name='John Doe' />;
    const newNode = <User name='Jairo Toro' />;

    render(root, oldNode);
    updateNode(root, oldNode, newNode);
  });
});
