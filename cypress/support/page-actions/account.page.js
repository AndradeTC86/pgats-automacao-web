const selectors = {
  continueButton: '[data-qa="continue-button"]',
  deleteLink: 'a[href="/delete_account"]',
  logoutLink: 'a[href="/logout"]',
  accountDeleted: '[data-qa="account-deleted"]'
}

module.exports = {
  continue() {
    cy.get(selectors.continueButton).click()
  },

  delete() {
    cy.get(selectors.deleteLink).click()
  },

  logout() {
    cy.get(selectors.logoutLink).click()
  },

  assertAccountDeleted() {
    cy.get(selectors.accountDeleted)
      .should('be.visible')
      .and('have.text', 'Account Deleted!')
  }
}
