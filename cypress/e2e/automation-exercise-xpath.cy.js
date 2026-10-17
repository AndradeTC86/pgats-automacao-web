/// <reference types="cypress" />
require('cypress-xpath')

describe('Automation Exercise', () => {
  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.xpath('//a[normalize-space()="Signup / Login"]').click()

    cy.xpath('//input[@placeholder="Name"]').type(`PGATS Aut`)
    cy.xpath('//input[@data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)
    cy.xpath('//button[normalize-space()="Signup"]').click()

    cy.xpath('//input[@id="id_gender1"]').check()
    cy.xpath('//input[@id="password"]').type('12345')

    cy.xpath('//select[@id="days"]').select('1')
    cy.xpath('//select[@id="months"]').select('September')
    cy.xpath('//select[@id="years"]').select('1990')

    cy.xpath('//input[@id="newsletter"]').check()
    cy.xpath('//input[@id="optin"]').check()
    cy.xpath('//input[@id="first_name"]').type('PGATS')
    cy.xpath('//input[@id="last_name"]').type('Aut')
    cy.xpath('//input[@id="company"]').type('PGATS')
    cy.xpath('//input[@id="address1"]').type('Example Address')
    cy.xpath('//input[@id="address2"]').type('Example Address 02')
    cy.xpath('//select[@id="country"]').select('United States')
    cy.xpath('//input[@id="state"]').type('California')
    cy.xpath('//input[@id="city"]').type('San Francisco')
    cy.xpath('//input[@id="zipcode"]').type('12345')
    cy.xpath('//input[@id="mobile_number"]').type('999999999')
    cy.xpath('//button[normalize-space()="Create Account"]').click()

    cy.xpath('//b[normalize-space()="Account Created!"]')
      .should('be.visible')
      .and('contain', 'Account Created!')
  })

  it('Efetuar Login de Usuário com email e senha corretos', () => {    
    cy.visit('https://www.automationexercise.com/login')
    
    cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//input[@placeholder="Password"]').type('12345')
    cy.xpath('//button[normalize-space()="Login"]').click()

    cy.xpath('//li[10]//a[1]')
      .contains('PGATS Aut')
      .should('be.visible')
  })

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//input[@placeholder="Password"]').type('54321')
    cy.xpath('//button[normalize-space()="Login"]').click()

    cy.xpath('//p[normalize-space()="Your email or password is incorrect!"]')      
      .should('be.visible')
      .should('contain.text', 'Your email or password is incorrect!')      
  })

  it('Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    cy.xpath('//input[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//input[@placeholder="Password"]').type('12345')
    cy.xpath('//button[normalize-space()="Login"]').click()

    cy.xpath('//a[normalize-space()="Logout"]')
      .should('be.visible')
      .click()

    cy.xpath('//h2[normalize-space()="Login to your account"]').should('be.visible')
    cy.xpath('//a[normalize-space()="Logout"]').should('not.exist')
    cy.xpath('//a[normalize-space()="Signup / Login"]').should('be.visible');
    cy.url().should('include', 'login')
  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com')
    cy.xpath('//a[normalize-space()="Signup / Login"]').click()

    cy.xpath('//input[@placeholder="Name"]').type(`PGATS Aut`)
    cy.xpath('//input[@data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`)
    cy.xpath('//button[normalize-space()="Signup"]').click()

    cy.xpath('//p[normalize-space()="Email Address already exist!"]')
      
      .should('be.visible')
      .should('contain.text', 'Email Address already exist!')
  });
});