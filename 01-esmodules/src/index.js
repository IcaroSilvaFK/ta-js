import Controller from "./controller.js";
import Service from "./service.js";
import config from "./config.json" with { type: "json" };
import View from "./view.js";

Controller.initialize(
  new Service({
    url: config.url,
  }),
  new View()
);
