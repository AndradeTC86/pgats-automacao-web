const selectors = {
  productsLink: '.shop-menu > .nav > :nth-child(2) > a',
  pageTitle: '.title',
  productView: ':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a',
  productName: '.product-information > h2',
  productPrice: '.product-information > :nth-child(5) > span',
  productAvailability: '.product-information > :nth-child(6)',
  productBrand: '.product-information > :nth-child(8)',
  searchInput: '#search_product',
  searchButton: '#submit_search',
  searchResultName: '.productinfo > p',
  productsList: '.features_items'
}

module.exports = {
  visitProducts() {
    cy.get(selectors.productsLink).click()
  },

  assertProductsPageVisible() {
    cy.get(selectors.pageTitle).should('have.text', 'All Products')
  },

  openProduct() {
    cy.get(selectors.productView).click()
  },

  assertProductDetails() {
    cy.url().should('equal', 'https://automationexercise.com/product_details/1')
    cy.get(selectors.productName).should('have.text', 'Blue Top')
    cy.get(selectors.productPrice).should('have.text', 'Rs. 500')
    cy.get(selectors.productAvailability)
      .should('have.text', 'Availability: In Stock')
    cy.get(selectors.productBrand).should('have.text', 'Brand: Polo')
  },

  searchProduct(productName) {
    cy.get(selectors.searchInput).type(productName)
    cy.get(selectors.searchButton).click()
  },

  assertSearchResult(productName) {
    cy.get(selectors.searchResultName).should('have.text', productName)
    cy.get(selectors.productsList).should('have.length', '1')
  }
}
