import ElementService from "./elementService.js";

export default class View {
  constructor() {
    this.html = new ElementService();
  }

  updateTable(items) {
    const container = this.html.$("#app");
    this.html.inner(container, this.formatItems(items));
  }

  formatItems(items) {
    return items
      .map(
        (char) => `
        <li class="card">
          <img
            src="${char.image}"
            alt="${char.name}"
            />
          <div>
            <b>${char.name}</b>
            <span class="${char.isAlive ? "" : "dead"}">
            ${char.status}
            </span>
          </div>
        </li>`
      )
      .join("\n");
  }
}
