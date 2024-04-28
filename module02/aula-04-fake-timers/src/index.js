import Task from "./task.js";

const oneSecond = 1_000;
const runInASec = new Date(Date.now() + oneSecond);
const runInTwSecs = new Date(Date.now() + oneSecond * 2);
const runInThreeSecs = new Date(Date.now() + oneSecond * 3);

const task = new Task();

task.save({
  name: "task1",
  dueAt: runInASec,
  fn: () => console.log("task1 executed"),
});

task.save({
  name: "task2",
  dueAt: runInTwSecs,
  fn: () => console.log("task2 executed"),
});

task.save({
  name: "task2",
  dueAt: runInThreeSecs,
  fn: () => console.log("task3 executed"),
});

task.run(oneSecond);
