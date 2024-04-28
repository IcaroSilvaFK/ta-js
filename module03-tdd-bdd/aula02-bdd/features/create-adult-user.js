import { When, Then, Given, BeforeStep } from "@cucumber/cucumber";
import assert from "node:assert";

let _testServerAddress = "";

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
  "I create a new user with the following details 2:",
  async function (dataTable) {
    const [data] = dataTable.hashes();

    const response = await createUser(data);

    assert.strictEqual(response.status, 201);

    _context.userData = await response.json();
  }
);

When("When I request the user with ID {string}", async function () {
  const user = await findUserById(_context.userData.id);

  _context.createdUserData = user;
});

Then(
  "the user should be categorized as an {string}",
  async function (category) {
    assert.strictEqual(_context.createdUserData.category, category);
  }
);
