import { Then } from "@badeball/cypress-cucumber-preprocessor";

const item = {
  title: "BILU 2",
  imageUrl:
    "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg",
};

beforeEach(() => {
  cy.restoreLocalStorage();
});

afterEach(() => {
  cy.saveLocalStorage();
});

Then("I have submitted an image", () => {
  localStorage.setItem("tdd-ew-db", JSON.stringify([item]));
});

Then("I refresh the page", () => {
  cy.reload();
});

Then(
  "I should still see the submitted image in the list of registered images",
  () => {
    const items = window.localStorage.getItem("tdd-ew-db");

    expect(items).to.eql(JSON.stringify([item]));
  }
);
