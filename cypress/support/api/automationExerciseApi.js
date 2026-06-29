import { registerCreatedUser } from "../testUsers";

export function createAutomationExerciseUser(user, email) {
  return cy
    .request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: {
        name: user.name,
        email,
        password: user.password,
        title: "Mr",
        birth_date: "10",
        birth_month: "5",
        birth_year: "1990",
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address,
        address2: "",
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain("201");
      registerCreatedUser(email, user.password);
    });
}

export function cleanupAutomationExerciseUser(email, password) {
  return cy.then(() => {
    const body = new URLSearchParams({ email, password });

    return fetch(`${Cypress.config("baseUrl")}/api/deleteAccount`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((response) => {
        if (!response.ok) {
          cy.log(`Falha ignorada na limpeza do usuario ${email}. Status: ${response.status}`);
        }
      })
      .catch((error) => {
        cy.log(`Falha ignorada na limpeza do usuario ${email}: ${error.message}`);
      });
  });
}
