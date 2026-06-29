import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import loginPage from "../../support/page_objects/loginPage";
import productsPage from "../../support/page_objects/productsPage";
import cartPage from "../../support/page_objects/cartPage";
import checkoutPage from "../../support/page_objects/checkoutPage";

let checkoutUser;
let checkoutProduct;

Given("que estou autenticado para revisar o pedido", () => {
  cy.fixture("users").then(({ validUser }) => {
    const email = `qa.checkout.${Date.now()}@example.com`;

    checkoutUser = { ...validUser, email };
    cy.createAutomationExerciseUser(checkoutUser, email);
    homePage.visit();
    homePage.goToLogin();
    loginPage.login(email, checkoutUser.password);
    homePage.assertLoggedUser(checkoutUser.name);
  });
});

When("adiciono um produto e prossigo para o checkout", () => {
  cy.fixture("users").then(({ products }) => {
    checkoutProduct = products.valid;
    homePage.goToProducts();
    productsPage.search(checkoutProduct);
    productsPage.addProductToCart(checkoutProduct);
    productsPage.viewCartFromModal();
    cartPage.proceedToCheckout();
  });
});

Then("devo visualizar o produto na revisao do pedido", () => {
  checkoutPage.assertAddressDetailsVisible();
  checkoutPage.assertReviewOrder(checkoutProduct);
});

Given("que adicionei um produto no carrinho sem login", () => {
  cy.fixture("users").then(({ products }) => {
    checkoutProduct = products.valid;
    homePage.visit();
    homePage.goToProducts();
    productsPage.search(checkoutProduct);
    productsPage.addProductToCart(checkoutProduct);
    productsPage.viewCartFromModal();
  });
});

When("tento prosseguir para o checkout sem autenticacao", () => {
  cartPage.proceedToCheckout();
});

Then("devo visualizar a solicitacao de cadastro ou login", () => {
  cartPage.assertLoginRequiredModal();
});
