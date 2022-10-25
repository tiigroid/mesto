export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
      this._container.prepend(item);
  }

  renderItem(data) {
    this._renderer(data);
  }
}
