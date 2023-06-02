describe('Categories naviagtion Testing', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('should navigate to the "Laptops" page when "Laptops" button is clicked', () => {
    cy.contains('Laptops').click();
    cy.contains('Sony vaio i5').should('exist');
    cy.contains('MacBook Pro').should('exist');
    cy.contains('Dell i7 8gb').should('exist');
  });

  it('should navigate to the "Monitors" page when "Monitors" button is clicked', () => {
    cy.contains('Monitors').click();
    cy.contains('Apple monitor 24').should('exist');
    cy.contains('ASUS Full HD').should('exist');

  });
});
