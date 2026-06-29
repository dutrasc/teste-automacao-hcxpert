import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import loginPage from "../../support/page_objects/loginPage";

let validUser;
let validEmail;

Given("que estou na pagina de cadastro e login", () => {
  homePage.visit();
  homePage.goToLogin();
});

Given("existe uma conta valida criada para login", () => {
  cy.fixture("users").then(({ validUser: user }) => {
    validUser = user;
    validEmail = `qa.login.${Date.now()}@example.com`;

    cy.createAutomationExerciseUser(validUser, validEmail);
  });
});

When("realizo login com a conta valida", () => {
  loginPage.login(validEmail, validUser.password);
});

When("realizo login com credenciais invalidas", () => {
  cy.fixture("users").then(({ invalidUser }) => {
    loginPage.login(invalidUser.email, invalidUser.password);
  });
});

Then("devo visualizar o usuario logado", () => {
  homePage.assertLoggedUser(validUser.name);
  cy.deleteAutomationExerciseUser(validEmail, validUser.password);
});

Then("devo visualizar mensagem de erro de login", () => {
  loginPage.assertInvalidLoginMessage();
});
