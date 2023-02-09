export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // публичный метод для отрисовки всех элементов
  renderItems(items) {
    items.forEach((item) => {
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
