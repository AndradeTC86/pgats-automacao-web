const { faker } = require('@faker-js/faker')
const loginPage = require('../support/page-actions/login.page')
const signupPage = require('../support/page-actions/signup.page')
const accountPage = require('../support/page-actions/account.page')
const testData = require('../fixtures/test-data.json')

describe('Feature de Signup / Login', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('Deve registrar um usuário com sucesso e excluir a conta criada', () => {
    const newUser = {
    ...testData.newUser,
    email: faker.internet.email()
  }
    
    signupPage.startSignup(newUser)
    signupPage.completeSignup(newUser)
    signupPage.assertAccountCreated()

    accountPage.continue()
    accountPage.delete()
    accountPage.assertAccountDeleted()
  })

  it('Deve realizar login com sucesso', () => {
    loginPage.login(testData.existingUser)
    loginPage.assertLoggedInAs(testData.existingUser.name)
  })

  it('Não deve realizar login com usuário ou e-mail inválido', () => {
    loginPage.login(testData.invalidUser)
    loginPage.assertInvalidCredentials()
  })

  it('Não deve permitir o cadastro de um e-mail repetido', () => {
    signupPage.startSignup(testData.existingUser)
    signupPage.assertEmailAlreadyExists()
  })

  it('Deve realizar logout', () => {
    loginPage.login(testData.existingUser)
    accountPage.logout()
    loginPage.assertVisible()
  })
})
