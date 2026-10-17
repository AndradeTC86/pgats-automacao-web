const selectors = {
  productAddButton:
    ':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn',
  continueShoppingButton: '.modal-footer > .btn',
  cartLink: '.shop-menu > .nav > :nth-child(3) > a',
  cartTitle: '.active',
  proceedToCheckoutButton: '.col-sm-6 > .btn',
  addressHeading: ':nth-child(2) > .heading',
  orderHeading: ':nth-child(4) > .heading',
  comment: '.form-control',
  placeOrderButton: ':nth-child(7) > .btn',
  cardName: '[data-qa="name-on-card"]',
  cardNumber: '[data-qa="card-number"]',
  cardCvc: '[data-qa="cvc"]',
  cardExpiryMonth: '[data-qa="expiry-month"]',
  cardExpiryYear: '[data-qa="expiry-year"]',
  payButton: '[data-qa="pay-button"]',
  orderPlaced: '[data-qa="order-placed"] > b'
}

module.exports = {
  addProductToCart() {
    cy.get(selectors.productAddButton).click()
    cy.get(selectors.continueShoppingButton).click()
  },

  visitCart() {
    cy.get(selectors.cartLink).click()
  },

  assertCartVisible() {
    cy.get(selectors.cartTitle).should('have.text', 'Shopping Cart')
  },

  proceedToCheckout() {
    cy.get(selectors.proceedToCheckoutButton).click()
  },

  assertCheckoutSectionsVisible() {
    cy.get(selectors.addressHeading).should('have.text', 'Address Details')
    cy.get(selectors.orderHeading).should('have.text', 'Review Your Order')
  },

  placeOrder(comment) {
    cy.get(selectors.comment).type(comment)
    cy.get(selectors.placeOrderButton).click()
  },

  pay(paymentDetails) {
    cy.get(selectors.cardName).type(paymentDetails.name)
    cy.get(selectors.cardNumber).type(paymentDetails.number)
    cy.get(selectors.cardCvc).type(paymentDetails.cvc)
    cy.get(selectors.cardExpiryMonth).type(paymentDetails.expiryMonth)
    cy.get(selectors.cardExpiryYear).type(paymentDetails.expiryYear)
    cy.get(selectors.payButton).click()
  },

  assertOrderPlaced() {
    cy.get(selectors.orderPlaced).should('have.text', 'Order Placed!')
  }
}
