class HomePage {
  visit() {
    cy.visit("/");
    cy.dismissConsentIfVisible();
  }

  goToLogin() {
    cy.contains("a", "Signup / Login").click();
  }

  goToProducts() {
    cy.contains("a", "Products").click();
  }

  goToCart() {
    cy.contains("a", "Cart").click();
  }

  assertLoggedUser(name) {
    cy.contains("Logged in as").should("be.visible");
    cy.contains("b", name).should("be.visible");
  }

  logoutIfLoggedIn() {
    cy.get("body").then(($body) => {
      if ($body.text().includes("Logout")) {
        cy.contains("a", "Logout").click();
      }
    });
  }

  deleteAccountIfVisible() {
    cy.get("body").then(($body) => {
      if ($body.text().includes("Delete Account")) {
        cy.contains("a", "Delete Account").click();
        cy.contains("Account Deleted!").should("be.visible");
        cy.contains("a", "Continue").click();
      }
    });
  }
}

export default new HomePage();
