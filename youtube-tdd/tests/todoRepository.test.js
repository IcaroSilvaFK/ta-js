const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");
const TodoRepository = require("../src/todoRepository");

const mockDatabase = [
  {
    name: "Whyy",
    age: 20,
    meta: { revision: 0, created: 1714265981670, version: 0 },
    $loki: 1,
  },
  {
    name: "Icaro",
    age: 20,
    meta: { revision: 0, created: 1714265981670, version: 0 },
    $loki: 2,
  },
];

describe("#TodoRepository suite test", () => {
  let todoRepository;
  let sandbox;

  before(() => {
    todoRepository = new TodoRepository();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("methods signature", () => {
    it("should call insertOne from lokijs", () => {
      const functionName = "find";
      const expectedReturn = mockDatabase;

      sandbox
        .stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const result = todoRepository.list();

      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    });

    it("should call find from lokijs", () => {
      const functionName = "insertOne";
      const expectedReturn = true;

      sandbox
        .stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const data = {
        name: "Icaro",
      };

      const result = todoRepository.create(data);

      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data))
        .to.be.ok;
    });
  });
});
