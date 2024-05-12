import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from "../common/registerForm.cy.js";

Then("I should see {string} message above the title field", (errorMessage) => {
  registerForm.elements.titleFeedback().should("contain.text", errorMessage);
});

Then(
  "I should see {string} message above the imageUrl field",
  (errorMessage) => {
    registerForm.elements.urlFeedback().should("contain.text", errorMessage);
  }
);

Then("I should see an exclamation icon in the title and URL fields", () => {
  cy.get(".input-group").should("have.class", "has-validation");
  cy.get(".form-control").should("have.css", "background-image");
});
