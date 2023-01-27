export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод для отрисовки всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // публичный метод добавления DOM-элемента в конец контейнера
  addItemEnd(element) {
    this._container.append(element);
  }

  // публичный метод добавления DOM-элемента в начало контейнера
  addItemStart(element) {
    this._container.prepend(element);
  }
}
