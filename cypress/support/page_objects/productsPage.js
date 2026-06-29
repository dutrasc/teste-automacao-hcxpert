class ProductsPage {
  search(productName) {
    cy.get("#search_product").clear().type(productName);
    cy.get("#submit_search").click();
  }

  assertSearchResultsTitle() {
    cy.contains("Searched Products").should("be.visible");
  }

  assertProductVisible(productName) {
    cy.get(".features_items").contains(".productinfo", productName).should("be.visible");
  }

  assertProductNotVisible(productName) {
    cy.get(".features_items").contains(".productinfo", productName).should("not.exist");
  }

  addProductToCart(productName) {
    cy.contains(".product-image-wrapper", productName)
      .scrollIntoView()
      .within(() => {
        // O site exibe a acao em overlay de hover; no headless, o force reduz flake desse overlay externo.
        cy.contains("a", "Add to cart").click({ force: true });
      });
  }

  continueShopping() {
    cy.contains("button", "Continue Shopping").click();
  }

  viewCartFromModal() {
    cy.contains("u", "View Cart").click();
  }

  assertAddedModal() {
    cy.contains("Added!").should("be.visible");
    cy.contains("Your product has been added to cart.").should("be.visible");
  }
}

export default new ProductsPage();
