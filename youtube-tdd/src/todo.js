// const { randomUUID } = require("crypto");
const uuid = require("crypto");

class Todo {
  constructor({ text, when }) {
    this.text = text;
    this.when = when;
    // this.createdAt = new Date();
    this.status = "";
    this.id = uuid.randomUUID();
  }

  isValid() {
    //                                  valueOf retorna a data em ms se n tiver retorn NaN
    return !!this.text && !isNaN(this.when.valueOf());
  }
}

module.exports = Todo;
