class CartPage {
  assertProductInCart(productName) {
    cy.get("#cart_info").should("be.visible");
    cy.contains("#cart_info", productName).should("be.visible");
  }

  assertProductNotInCart(productName) {
    cy.get("#cart_info").should("be.visible");
    cy.contains("#cart_info", productName).should("not.exist");
  }

  assertCartIsEmpty() {
    cy.contains("Cart is empty!").should("be.visible");
  }

  proceedToCheckout() {
    cy.contains("a", "Proceed To Checkout").click();
  }

  assertLoginRequiredModal() {
    cy.contains(".modal-content", "Register / Login account to proceed on checkout.").should("be.visible");
  }
}

export default new CartPage();
