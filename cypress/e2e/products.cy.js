const productsPage = require('../support/page-actions/products.page')

describe('Feature de Products', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Verificar a página de detalhe do produto', () => {
        productsPage.visitProducts()
        productsPage.assertProductsPageVisible()
        productsPage.openProduct()
        productsPage.assertProductDetails()
    })

    it('Validar a busca de um produto', () => {
        productsPage.visitProducts()
        productsPage.assertProductsPageVisible()
        productsPage.searchProduct('Stylish Dress')
        productsPage.assertSearchResult('Stylish Dress')
    })
})