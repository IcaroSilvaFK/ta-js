const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const Todo = require("../src/todo");

describe("#Todo tests suite", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("#isValid", () => {
    it("should return invalid when creating an object without text", () => {
      const data = {
        text: "",
        when: new Date("2020-12-01"),
      };
      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.be.not.ok;
    });
    it("Should return invalid when creating an object using the when property invalid", () => {
      const data = {
        text: "Hello world",
        when: new Date("20-12-01"),
      };
      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.be.not.ok;
    });
    it("should have 'id','text','when' and 'status' properties after creating object", () => {
      const data = {
        text: "Hello world",
        when: new Date("2020-12-01"),
      };

      const expectedId = "00001";
      const crypto = require("crypto");
      const fakeUUID = sandbox.fake.returns(expectedId);

      sandbox.replace(crypto, "randomUUID", fakeUUID);

      const todo = new Todo(data);
      const expectedItem = {
        text: data.text,
        when: data.when,
        id: expectedId,
        status: "",
      };

      const result = todo.isValid();
      expect(result).to.be.ok;

      expect(crypto.randomUUID.calledOnce).to.be.ok;
      expect(todo).to.be.deep.equal(expectedItem);
    });
  });
});
