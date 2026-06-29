import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import productsPage from "../../support/page_objects/productsPage";

let searchedProduct;

Given("que estou na pagina de produtos para busca", () => {
  homePage.visit();
  homePage.goToProducts();
});

When("busco por um produto existente", () => {
  cy.fixture("users").then(({ products }) => {
    searchedProduct = products.valid;
    productsPage.search(searchedProduct);
  });
});

When("busco por um produto inexistente", () => {
  cy.fixture("users").then(({ products }) => {
    searchedProduct = products.invalid;
    productsPage.search(searchedProduct);
  });
});

Then("devo visualizar o produto nos resultados", () => {
  productsPage.assertSearchResultsTitle();
  productsPage.assertProductVisible(searchedProduct);
});

Then("nao devo visualizar produto com o nome pesquisado", () => {
  productsPage.assertSearchResultsTitle();
  productsPage.assertProductNotVisible(searchedProduct);
});
