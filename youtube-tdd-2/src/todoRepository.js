const Loki = require("lokijs");

class TodoRepository {
  constructor() {
    const lokiInstance = new Loki("todo", {});
    this.schedule = lokiInstance.addCollection("schedule");
  }

  list() {
    return this.schedule.find();
  }

  create(data) {
    return this.schedule.insertOne(data);
  }
}

module.exports = TodoRepository;

// const tr = new TodoRepository();

// tr.create({ name: "Icaro Viera", age: 23 });
// tr.create({ name: "Icaro", age: 26 });

// console.log(tr.list());
