const selectors = {
  loginLink: 'a[href="/login"]',
  email: '[data-qa="login-email"]',
  password: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',
  loginHeading: '.login-form h2',
  loginError: '.login-form p'
}

module.exports = {
  visit() {
    cy.visit('/')
    cy.get(selectors.loginLink).click()
  },

  login(user) {
    cy.get(selectors.email).type(user.email)
    cy.get(selectors.password).type(user.password)
    cy.get(selectors.loginButton).click()
  },

  assertLoggedInAs(name) {
    cy.contains('a', `Logged in as ${name}`).should('be.visible')
  },

  assertInvalidCredentials() {
    cy.get(selectors.loginError)
      .should('be.visible')
      .and('have.text', 'Your email or password is incorrect!')
  },

  assertVisible() {
    cy.get(selectors.loginHeading)
      .should('be.visible')
      .and('have.text', 'Login to your account')
  }
}
