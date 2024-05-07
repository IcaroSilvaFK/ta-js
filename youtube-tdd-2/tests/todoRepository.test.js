const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const TodoRepository = require("../src/todoRepository");

describe("#TodoRepository Test suite", () => {
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
    it("should call find from lokijs", () => {
      const mockDatabase = [
        {
          name: "Icaro Viera",
          age: 23,
          meta: { revision: 0, created: 1714432782769, version: 0 },
          $loki: 1,
        },
        {
          name: "Icaro",
          age: 26,
          meta: { revision: 0, created: 1714432782769, version: 0 },
          $loki: 2,
        },
      ];

      const functionName = "find";
      const expectedReturn = mockDatabase;

      sandbox.stub(todoRepository.schedule, functionName).returns(mockDatabase);

      const result = todoRepository.list();

      expect(result).to.be.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    });
    it("should call insertOne from lokijs", () => {
      const data = {
        name: "Icaro",
        age: 23,
      };

      const functionName = "insertOne";

      sandbox.stub(todoRepository.schedule, functionName).returns(true);

      const result = todoRepository.create(data);

      expect(result).to.be.ok;
      expect(todoRepository.schedule[functionName].calledWithExactly(data)).to
        .be.ok;
    });
  });
});
