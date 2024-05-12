import { Then } from "@badeball/cypress-cucumber-preprocessor";

import { registerForm } from "../common/registerForm.cy.js";

Then("The inputs should be cleared", () => {
  registerForm.elements.imageUrlInput().should("have.value", "");
  registerForm.elements.titleInput().should("have.value", "");
});

Then("I should see a check icon in the title field", () => {
  cy.get(".form-control").should("have.css", "background-image");
});

Then("I should see a check icon in the imageUrl field", () => {
  cy.get(".form-control").should("have.css", "background-image");
});
