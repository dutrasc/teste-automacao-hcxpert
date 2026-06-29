import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import productsPage from "../../support/page_objects/productsPage";
import cartPage from "../../support/page_objects/cartPage";

let cartProduct;

Given("que estou na pagina de produtos para adicionar item", () => {
  homePage.visit();
  homePage.goToProducts();
});

When("busco e adiciono um produto valido ao carrinho", () => {
  cy.fixture("users").then(({ products }) => {
    cartProduct = products.valid;
    productsPage.search(cartProduct);
    productsPage.addProductToCart(cartProduct);
  });
});

Then("devo ver a confirmacao de produto adicionado", () => {
  productsPage.assertAddedModal();
});

Then("devo visualizar o produto adicionado no carrinho", () => {
  productsPage.viewCartFromModal();
  cartPage.assertProductInCart(cartProduct);
});

Given("que estou com o carrinho vazio", () => {
  homePage.visit();
});

When("acesso a pagina do carrinho sem adicionar item", () => {
  homePage.goToCart();
});

Then("devo visualizar o carrinho vazio", () => {
  cartPage.assertCartIsEmpty();
});
