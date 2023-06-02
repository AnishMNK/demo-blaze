describe('Carousel Testing', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com'); 
  });

  it('should navigate to the next slide when the next button is clicked', () => {
    cy.get('.carousel-control-next-icon').click();

    cy.get('.d-block')
      .should('be.visible')
  });

  it('should navigate to the previous slide when the previous button is clicked', () => {
    cy.get('.carousel-control-prev-icon').click();

    cy.get('.d-block').should('be.visible');
  });

});
