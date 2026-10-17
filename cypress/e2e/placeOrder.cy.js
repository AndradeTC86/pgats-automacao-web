const { faker } = require('@faker-js/faker')
const loginPage = require('../support/page-actions/login.page')
const signupPage = require('../support/page-actions/signup.page')
const accountPage = require('../support/page-actions/account.page')
const productsPage = require('../support/page-actions/products.page')
const placeOrderPage = require('../support/page-actions/place-order.page')
const testData = require('../fixtures/test-data.json')

describe('Feature de Orders', () => {
    beforeEach(() => {
        loginPage.visit()
    })

    it('Registrar novo usuário antes de fazer o checkout', () => {
        const newUser = {
        ...testData.newUser,
        email: faker.internet.email()
        }
    
        signupPage.startSignup(newUser)
        signupPage.completeSignup(newUser)
        signupPage.assertAccountCreated()

        accountPage.continue()
        productsPage.visitProducts()
        placeOrderPage.addProductToCart()
        placeOrderPage.visitCart()
        placeOrderPage.assertCartVisible()
        placeOrderPage.proceedToCheckout()
        placeOrderPage.assertCheckoutSectionsVisible()
        placeOrderPage.placeOrder(testData.checkout.comment)
        placeOrderPage.pay({
            name: faker.person.fullName(),
            number: faker.finance.creditCardNumber(),
            ...testData.checkout.payment
        })
        placeOrderPage.assertOrderPlaced()
    })

    it('Realizar o login antes de fazer o checkout', () => {
        loginPage.login(testData.existingUser)
        loginPage.assertLoggedInAs(testData.existingUser.name)
        productsPage.visitProducts()
        placeOrderPage.addProductToCart()
        placeOrderPage.visitCart()
        placeOrderPage.assertCartVisible()
        placeOrderPage.proceedToCheckout()
        placeOrderPage.assertCheckoutSectionsVisible()
        placeOrderPage.placeOrder(testData.checkout.comment)
        placeOrderPage.pay({
            name: faker.person.fullName(),
            number: faker.finance.creditCardNumber(),
            ...testData.checkout.payment
        })
        placeOrderPage.assertOrderPlaced()
    })
})