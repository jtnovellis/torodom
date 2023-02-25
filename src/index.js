/** @jsx jtn */

export function jtn(tag, props, ...children) {
  const childrenNodes = children.length ? [].concat(...children) : null;
  return { tag, props: props || {}, children: childrenNodes };
}

export function render(node, component) {
  const element = createElement(component);
  node.appendChild(element);
}

function createElement(component) {
  if (typeof component === 'string') {
    return document.createTextNode(component);
  }

  if (typeof component.tag === 'object') {
    return createElement(component.tag);
  }

  if (typeof component.tag === 'function') {
    return createElement(component.tag(component.props));
  }

  const element = document.createElement(component.tag);

  setAttributes(element, component.props);

  component.children &&
    component.children
      .map(createElement)
      .forEach(child => element.appendChild(child));

  return element;
}

function setAttributes(element, props) {
  if (!props) return;
  Object.keys(props).forEach(key => {
    if (key === 'className') {
      element.setAttribute('class', props[key]);
      return;
    }
    element.setAttribute(key, props[key]);
  });
}
