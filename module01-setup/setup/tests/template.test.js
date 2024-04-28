import { expect, it } from "@jest/globals";

function sum(a, b) {
  return a + b;
}

it("Should sum tow numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
