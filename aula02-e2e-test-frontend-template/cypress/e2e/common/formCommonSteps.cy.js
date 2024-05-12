import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from "./registerForm.cy.js";

registerForm;

Given("I am on the image registration page", () => {
  cy.visit("/");
});

When("I enter {string} in the title field", (str) => {
  registerForm.typeTitle(str);
});

When("I enter {string} in the URL field", (str) => {
  registerForm.typeImageUrlInput(str);
});

Then("I click the submit button", () => {
  registerForm.clickButton();
});

Then("I can hit enter to submit the form", () => {
  cy.focused().type("{enter}");
});
