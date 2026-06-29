Cypress.Commands.add("dismissConsentIfVisible", () => {
  cy.get("body").then(($body) => {
    const consentButton = $body.find("button:contains('Consent'), button:contains('Accept')");

    if (consentButton.length) {
      cy.wrap(consentButton.first()).click({ force: true });
    }
  });
});
