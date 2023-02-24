/** @jsx jtn */

import { jtn, createElement } from '../src';

const root = document.getElementById('root');
const title = <h1>Hello World</h1>;

root.appendChild(createElement(title));
