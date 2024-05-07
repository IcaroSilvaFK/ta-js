const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const Todo = require("../src/todo");

describe("#TODO Test Suite", () => {
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("#isValid", () => {
    it("should return invalid when create an object without text", () => {
      const data = {
        text: "",
        when: new Date("2020-12-01"),
      };

      const todo = new Todo(data);

      const result = todo.isValid();

      expect(result).to.be.not.ok;
    });

    it('should return invalid when craeting an object using the "when" property invalid', () => {
      const data = {
        text: "Lorem",
        when: new Date("20-12-01"),
      };

      const todo = new Todo(data);

      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it('should have "id", "text", "when" and "status" properties after creating object', () => {
      const data = {
        text: "Hello world",
        when: new Date("2020-12-01"),
      };

      const expextedId = "00001";

      const crypto = require("crypto");
      const fakeUUID = sandbox.fake.returns(expextedId);
      sandbox.replace(crypto, "randomUUID", fakeUUID);

      const expectedItem = {
        text: data.text,
        when: data.when,
        status: "",
        id: expextedId,
      };
      const todo = new Todo(data);

      const result = todo.isValid();

      expect(result).to.be.ok;
      expect(crypto.randomUUID.calledOnce).to.be.ok;
      expect(todo).to.be.deep.equal(expectedItem);
    });
  });
});
