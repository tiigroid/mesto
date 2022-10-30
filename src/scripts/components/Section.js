export default class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderItems() {
    this._renderer();
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
