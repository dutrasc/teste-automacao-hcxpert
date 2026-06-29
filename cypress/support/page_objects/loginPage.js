class LoginPage {
  fillSignup(name, email) {
    cy.get('[data-qa="signup-name"]').clear().type(name);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.get('[data-qa="signup-button"]').click();
  }

  fillAccountDetails(user) {
    cy.get("#id_gender1").check();
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("May");
    cy.get('[data-qa="years"]').select("1990");
    cy.get("#newsletter").check();
    cy.get("#optin").check();
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);
    cy.get('[data-qa="create-account"]').click();
  }

  assertAccountCreated() {
    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
  }

  login(email, password) {
    cy.get('[data-qa="login-email"]').clear().type(email);
    cy.get('[data-qa="login-password"]').clear().type(password);
    cy.get('[data-qa="login-button"]').click();
  }

  assertInvalidLoginMessage() {
    cy.contains("Your email or password is incorrect!").should("be.visible");
  }
}

export default new LoginPage();
