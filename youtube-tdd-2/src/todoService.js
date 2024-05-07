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
    const result = this.todoRepository.list();

    return result.map(({ name, age }) => ({ name, age }));
  }
}

module.exports = TodoService;
