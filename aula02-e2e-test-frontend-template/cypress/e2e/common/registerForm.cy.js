class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    imageUrlInput: () => cy.get("#imageUrl"),
    button: () => cy.get("#btnSubmit"),
    titleFeedback: () => cy.get("#titleFeedback"),
    urlFeedback: () => cy.get("#urlFeedback"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeImageUrlInput(url) {
    cy.log({ url });
    if (!url) return;
    this.elements.imageUrlInput().type(url);
  }

  clickButton() {
    this.elements.button().click();
  }
}

export const registerForm = new RegisterForm();
