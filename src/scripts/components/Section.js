export default class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);;
  }

  renderItems(initialItems) {
    initialItems.forEach(item => {
      this.renderItem(item);
    });
  }

  renderItem(data) {
    this._renderer(data);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
