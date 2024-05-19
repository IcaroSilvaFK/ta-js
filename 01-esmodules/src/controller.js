export default class Controller {
  constructor(service, view) {
    this.service = service;

    this.view = view;
  }

  static async initialize(service, view) {
    const controller = new Controller(service, view);
    await controller.init();
  }

  async init() {
    const chars = await this.service.getChacracters({ skip: 0, limit: 5 });

    const data = this.prepareItems(chars);

    this.view.updateTable(data);
  }

  prepareItems(chars) {
    return chars.map(({ name, image, status }) => ({
      isAlive: status === "Alive",
      name,
      image,
      status,
    }));
  }
}
