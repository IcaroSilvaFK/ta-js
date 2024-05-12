import { Then } from "@badeball/cypress-cucumber-preprocessor";

import { registerForm } from "../common/registerForm.cy.js";

const newCardTitle = {};

Then("I have entered {string} in the title field", (title) => {
  registerForm.typeTitle(title);
  newCardTitle.title = title;
});

Then("I have entered {string} in the URL field", (url) => {
  registerForm.typeImageUrlInput(url);
  newCardTitle.imageUrl = url;
});

Then(
  "the list of registered images should be updated with the new item",
  () => {
    cy.get(".card").contains(newCardTitle.title).should("exist");
  }
);
//tdd-ew-db
Then("the new item should be stored in the localStorage", () => {
  const items = window.localStorage.getItem("tdd-ew-db");

  expect(items).to.eql(JSON.stringify([newCardTitle]));
});
