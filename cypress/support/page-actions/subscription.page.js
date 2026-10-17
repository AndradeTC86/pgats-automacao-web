const selectors = {
  email: '#susbscribe_email',
  subscribeButton: '#subscribe',
  successMessage: '.alert-success'
}

module.exports = {
  subscribe(email) {
    cy.get(selectors.email)
      .scrollIntoView()
      .type(email)
    cy.get(selectors.subscribeButton).click()
  },

  assertSubscriptionSuccess() {
    cy.get(selectors.successMessage)
      .should('be.visible')
      .and('have.text', 'You have been successfully subscribed!')
  }
}
