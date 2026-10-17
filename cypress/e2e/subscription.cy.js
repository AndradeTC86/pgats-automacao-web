const { faker } = require('@faker-js/faker')
const subscriptionPage = require('../support/page-actions/subscription.page')

describe('Feature de Subscription', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Fazer a subscrição através da home page', () => {
        subscriptionPage.subscribe(faker.internet.email())
        subscriptionPage.assertSubscriptionSuccess()
    })
})