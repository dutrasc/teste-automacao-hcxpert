class CheckoutPage {
  assertReviewOrder(productName) {
    cy.contains("Review Your Order").should("be.visible");
    cy.contains(".cart_description", productName).should("be.visible");
  }

  assertAddressDetailsVisible() {
    cy.contains("Address Details").should("be.visible");
  }
}

export default new CheckoutPage();
