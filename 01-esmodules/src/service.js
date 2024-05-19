export default class Service {
  constructor({ url }) {
    this.url = url;
  }

  async getChacracters({ skip, limit }) {
    if (localStorage.getItem("characters")) {
      const items = JSON.parse(localStorage.getItem("characters"));
      return items.slice(skip, limit);
    }

    const result = (await (await fetch(this.url)).json()).results;

    localStorage.setItem("characters", JSON.stringify(result));

    return result.slice(skip, limit);
  }
}
