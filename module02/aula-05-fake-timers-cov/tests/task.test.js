import { setTimeout } from "node:timers/promises";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Task from "../src/task.js";

describe("Task test Suite", () => {
  let _logMock;
  let _task;
  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();
    _task = new Task();
  });

  it("Should only run tasks that are due with fake timers (fast)", async () => {
    /*
      sempre q for usar timers usar o useFakeTimers para
      sobrescrever o global
    */
    jest.useFakeTimers();

    const tasks = [
      {
        name: "task-will-run-in-5-secs",
        dueAt: new Date(Date.now() + 5000), // 5 secs
        fn: jest.fn(),
      },
      {
        name: "task-will-run-in-10-secs",
        dueAt: new Date(Date.now() + 10000), // 10 secs
        fn: jest.fn(),
      },
    ];

    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200); // 200ms

    jest.advanceTimersByTime(4000);

    // ninguem deve ser executado ainda
    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(4000);

    expect(tasks.at(1).fn).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
