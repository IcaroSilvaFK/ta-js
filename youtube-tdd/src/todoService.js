class TodoService {
  constructor({ todoRepository }) {
    this.todoRepository = todoRepository;
  }

  create(todoItem) {
    if (!todoItem.isValid()) {
      return {
        error: {
          message: "invalid data",
          data: todoItem,
        },
      };
    }

    const { when } = todoItem;
    const today = new Date();

    const todo = {
      ...todoItem,
      status: when > today ? "pending" : "late",
    };

    return this.todoRepository.create(todo);
  }

  list(query) {
    const items = this.todoRepository.list();
    return items.map((item) => ({
      age: item.age,
      name: item.name,
    }));
  }
}

module.exports = TodoService;
