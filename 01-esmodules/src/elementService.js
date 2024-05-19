export default class ElementService {
  #document = globalThis.document;

  createElement(element) {
    return this.#document.createElement(element);
  }

  appendChild(container, ...elements) {
    for (const element of elements) {
      container.appendChild(element);
    }
  }

  $(selector) {
    return this.#document.querySelector(selector);
  }

  inner(container, str) {
    container.innerHTML = str;
  }
}
