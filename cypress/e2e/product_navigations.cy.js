describe('Product Listing Navigation Testing', () => {
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    it('should display next items when "Next" button is clicked', () => {
      cy.get('#next2').contains('Next').click();
  
      cy.get('.col-lg-9').should('be.visible');
    });
  
    it('should display previous items when "Previous" button is clicked', () => {

      cy.get("#next2").contains('Next').click();
  
      cy.get("#prev2").contains('Previous').click();
  
      cy.get('.col-lg-9').should('be.visible');
    });
  
  
  });
  