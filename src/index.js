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

export function updateNode(parentNode, oldNode, newNode, index = 0) {
  if (oldNode && typeof oldNode.tag === 'function') {
    oldNode = oldNode.tag(oldNode.props);
  }
  if (newNode && typeof newNode.tag === 'function') {
    newNode = newNode.tag(newNode.props);
  }

  if (!oldNode) {
    parentNode.appendChild(createElement(newNode));
  } else if (!newNode) {
    parentNode.removeChild(parentNode.childNodes[index]);
  } else if (newNode.tag) {
    const newNodeLength = newNode.children ? newNode.children.length : 0;
    const oldNodeLength = oldNode.children ? oldNode.children.length : 0;

    for (let i = 0; i < newNodeLength || i < oldNodeLength; i++) {
      updateNode(
        parentNode.childNodes[index],
        oldNode.children[i],
        newNode.children[i],
        i
      );
    }
  } else if (isDiferentNode(oldNode, newNode)) {
    parentNode.replaceChild(
      createElement(newNode),
      parentNode.childNodes[index]
    );
  }
}

function isDiferentNode(oldNode, newNode) {
  return (
    typeof oldNode !== typeof newNode ||
    (typeof oldNode === 'string' && oldNode !== newNode) ||
    oldNode.tag !== newNode.tag
  );
}
