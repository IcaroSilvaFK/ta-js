import crypto from "node:crypto";
// import fsSync from "node:fs";
import fs from "node:fs/promises";

export default class Service {
  #filename;

  constructor({ filename }) {
    this.#filename = filename;
  }

  #hashPassword(pass) {
    const hash = crypto.createHash("sha256");
    hash.update(pass);

    return hash.digest("hex");
  }
  async create({ username, pass }) {
    const data = JSON.stringify({
      username,
      password: this.#hashPassword(pass),
      createdAt: new Date().toISOString(),
    }).concat("\n");

    return fs.appendFile(this.#filename, data);
  }

  async read() {
    const existsFile = fsSync.existsSync(this.#filename);

    if (!existsFile) return [];

    const response = (await fs.readFile(this.#filename, "utf-8"))
      .split("\n")
      .filter((line) => !!line);

    if (!response.length) return [];

    return response
      .map((item) => JSON.parse(item))
      .map(({ password, ...rest }) => rest);
  }
}
