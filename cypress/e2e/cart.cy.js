describe('Cart Functionality Testing', () => {
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    it('should navigate to cart page when "Cart" button is clicked', () => {
      cy.get('#cartur').contains('Cart').click();
  
      cy.url().should('include', '/cart.html');
    });

    it('should display added products on the cart page', () => {
        cy.get('.hrefch').contains('Samsung galaxy s6').click();

        cy.get('.btn').contains('Add to cart').click();

        cy.get('#cartur').contains('Cart').click();

        cy.get('.table').should('be.visible'); 
        cy.get('.table').find('.success').should('have.length', 1);   
    });

    it('should delete the items from the cart when delete button is clicked',() =>{
        cy.get('.hrefch').contains('Samsung galaxy s6').click();
    
        cy.get('.btn').contains('Add to cart').click();

        cy.get('#cartur').contains('Cart').click();

        cy.get('.table').should('be.visible'); 
        cy.get('.table').find('.success').should('have.length', 1);  

        cy.get('.table tr:nth-child(1) td a').click();
        cy.get('.success').should('not.exist');
    })
});