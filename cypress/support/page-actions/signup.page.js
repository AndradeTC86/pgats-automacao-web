const selectors = {
  name: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  signupButton: '[data-qa="signup-button"]',
  gender: 'input[name="title"][value="Mr"]',
  accountName: '[data-qa="name"]',
  accountEmail: '[data-qa="email"]',
  password: '[data-qa="password"]',
  days: '[data-qa="days"]',
  months: '[data-qa="months"]',
  years: '[data-qa="years"]',
  firstName: '[data-qa="first_name"]',
  lastName: '[data-qa="last_name"]',
  company: '[data-qa="company"]',
  address: '[data-qa="address"]',
  address2: '[data-qa="address2"]',
  country: '[data-qa="country"]',
  state: '[data-qa="state"]',
  city: '[data-qa="city"]',
  zipcode: '[data-qa="zipcode"]',
  mobileNumber: '[data-qa="mobile_number"]',
  createAccount: '[data-qa="create-account"]',
  accountCreated: '[data-qa="account-created"]',
  continueButton: '[data-qa="continue-button"]',
  signupError: '.signup-form p'
}

module.exports = {
  startSignup(user) {
    cy.get(selectors.name).type(user.signupName || user.name)
    cy.get(selectors.email).type(user.email)
    cy.get(selectors.signupButton).click()
  },

  completeSignup(user) {
    cy.get(selectors.gender).check()
    cy.get(selectors.accountName).should('have.value', user.name)
    cy.get(selectors.accountEmail).should('have.value', user.email)
    cy.get(selectors.password).type(user.password)

    cy.get(selectors.days).select(user.birth.day)
    cy.get(selectors.months).select(user.birth.month)
    cy.get(selectors.years).select(user.birth.year)
    cy.get(selectors.firstName).type(user.firstName)
    cy.get(selectors.lastName).type(user.lastName)
    cy.get(selectors.company).type(user.company)
    cy.get(selectors.address).type(user.address)
    cy.get(selectors.address2).type(user.address2)
    cy.get(selectors.country).select(user.country)
    cy.get(selectors.state).type(user.state)
    cy.get(selectors.city).type(user.city)
    cy.get(selectors.zipcode).type(user.zipcode)
    cy.get(selectors.mobileNumber).type(user.mobileNumber)
    cy.get(selectors.createAccount).click()
  },

  assertAccountCreated() {
    cy.get(selectors.accountCreated)
      .should('be.visible')
      .and('have.text', 'Account Created!')
  },

  assertEmailAlreadyExists() {
    cy.get(selectors.signupError)
      .should('be.visible')
      .and('have.text', 'Email Address already exist!')
  }
}
