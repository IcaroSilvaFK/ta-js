import { BeforeStep, When, Given } from "@cucumber/cucumber";
import assert from "node:assert";

let _testServerAddress = "";
let _fileContext = {};

async function createUser(data) {
  return fetch(`${_testServerAddress}/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function findUserById(id) {
  const user = await fetch(`${_testServerAddress}/users/${id}`);
  return user.json();
}

BeforeStep(function () {
  _testServerAddress = this.testServerAddress;
});

When(
  `I create a young user with the following details:`,
  async function (dataTable) {
    const [data] = dataTable.hashes();

    const response = await createUser(data);

    _fileContext.httpResponse = await response.json();
  }
);
Given(
  "I should receive an error message that the user must be at least 18 years old",
  async function () {
    assert.deepStrictEqual(
      _fileContext.httpResponse.message,
      "User must be 18yo or older"
    );
  }
);
