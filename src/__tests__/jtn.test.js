/** @jsx jtn */

import { jtn } from '../index.js';

describe('jtn', () => {
  it('Should to return a data structure like React.createElement', () => {
    const element = <h1>Hello World</h1>;
    expect(element).toEqual({
      tag: 'h1',
      props: {},
      children: ['Hello World'],
    });
  });

  it('Should to return a data structure like React.createElement with props', () => {
    const element = <h1 className='title'>Hello World</h1>;
    expect(element).toEqual({
      tag: 'h1',
      props: { className: 'title' },
      children: ['Hello World'],
    });
  });

  it('Should to return a data structure like React.createElement with children', () => {
    const element = (
      <ul className='list'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    );
    expect(element).toEqual({
      tag: 'ul',
      props: {
        className: 'list',
      },
      children: [
        { tag: 'li', props: {}, children: ['1'] },
        { tag: 'li', props: {}, children: ['2'] },
        { tag: 'li', props: {}, children: ['3'] },
      ],
    });
  });

  it('Should to render a tag without children', () => {
    const element = <br />;
    expect(element).toEqual({
      tag: 'br',
      props: {},
      children: null,
    });
  });
});
