import { describe, expect, it } from "@jest/globals";
import { mapPerson } from "../src/person.js";

describe("Person test suite", () => {
  describe("happy path", () => {
    it("should test mapPerson func", () => {
      const personStr = '{"name": "Icaro","age": 23}';
      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: "Icaro",
        age: 23,
        createdAt: expect.any(String),
      });
    });
  });

  describe("what covarege doesnt tell you", () => {
    it("should not  mapPerson given invalid JSON string", () => {
      const personStr = '{"name": ';

      expect(() => mapPerson(personStr)).toThrow(
        "Unexpected end of JSON input"
      );
    });

    it("should not  mapPerson given invalid JSON data", () => {
      const personStr = "{}";
      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(String),
      });
    });
  });
});
