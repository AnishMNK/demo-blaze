
Cypress.Commands.add(
    "typeWithDelay",
    { prevSubject: true },
    (subject, text, delay = 50) => {
      cy.wrap(subject).clear().type(text.charAt(0), { delay });
      for (let i = 1; i < text.length; i++) {
        cy.wrap(subject).type(text.charAt(i), { delay });
      }
    }
  );
  describe('Navigation Bar Testing', () => {
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    it('should navigate to the home page when logo is clicked', () => {
      cy.contains('Product Store').click();
  
      cy.get('.navbar-brand').click();
  
      cy.url().should('eq', 'https://www.demoblaze.com/index.html');
    });
    
    it('should navigate to the "Home" page when "Home" link is clicked', () => {
      cy.contains('Home').click();
      cy.url().should('include', '/index.html');
      cy.get('.carousel-inner').should('exist');
    });
  
    it('should open and interact with the contact form popup', () => {
      cy.get('.nav-link').contains('Contact').click();
      cy.get('#exampleModal').as('contactForm');
  
      // Make the contact form popup visible
      cy.get('@contactForm')
        .should('have.css', 'display', 'none')
        .invoke('show')
        .should('have.css', 'display', 'block');
  
      // Interact with the contact form fields
      cy.get('@contactForm').find('#recipient-name').type('John Doe');
      cy.get('@contactForm').find('#recipient-email').type('johndoe@example.com');
      cy.get('@contactForm').find('#message-text').type('This is a test message');
  
      // Submit the contact form
      cy.get('@contactForm').contains('Send message').click();
  
      // Verify successful submission message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Thanks for the message!!');
      });
    });
    
    it('should open the "About Us" modal when "About" link is clicked', () => {
      cy.get('.nav-link').contains('About us').click();
  
      // Make the "About Us" modal visible
      cy.get('#videoModal')
        .should('have.css', 'display', 'none')
        .invoke('show')
        .should('have.css', 'display', 'block');
  
      // Verify the title of the "About Us" modal
      cy.get('#videoModalLabel')
        .should('be.visible')
        .should('have.text', 'About us');
      
      cy.get('.vjs-poster')
        .should('be.visible');
  
      cy.get('.btn-secondary')
        .should('be.visible')
        .contains("Close");
  
    });
  
    it('should successfully sign up with valid credentials', () => {
  
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('windowAlert');
        });
      cy.get('.nav-link').contains('Sign up').click();
      const username = generateRandomString();

      cy.get('#sign-username').typeWithDelay(username);
      cy.get('#sign-password').typeWithDelay('Anish123@123');
  
      cy.get(".btn").contains('Sign up').click();
      cy.get('@windowAlert').should('be.calledWith', 'Sign up successful.');
    });
  
    
    it('should successfully log-in with valid credentials', () => {
  
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('windowAlert');
        });
      cy.get('.nav-link').contains('Sign up').click();
      const username = generateRandomString();


      cy.get('#sign-username').typeWithDelay(username);
      cy.get('#sign-password').typeWithDelay('Anish123@123');
  
      cy.get(".btn").contains('Sign up').click();
    
      cy.get('.nav-link').contains('Log in').click();
  
      cy.get('#loginusername').typeWithDelay(username);
      cy.get('#loginpassword').typeWithDelay('Anish123@123');
  
      cy.get(".btn").contains('Log in').click();
  
  
    });

    it('should display the name of the user when successfully logged-in', () => {
        cy.window().then((win) => {
          cy.stub(win, 'alert').as('windowAlert');
          });
        cy.get('.nav-link').contains('Sign up').click();
        const username = generateRandomString();

        cy.get('#sign-username').typeWithDelay(username);
        cy.get('#sign-password').typeWithDelay('Anish123@123');
    
        cy.get(".btn").contains('Sign up').click();
      
        cy.get('.nav-link').contains('Log in').click();
    
        cy.get('#loginusername').typeWithDelay(username);
        cy.get('#loginpassword').typeWithDelay('Anish123@123');
    
        cy.get(".btn").contains('Log in').click();
    
        cy.get('#nameofuser').should('have.text', `Welcome ${username}`);
    
      });
      it('should have logout button in the navbar instead of log-in when user sign-in to the website', () => {
  
        cy.window().then((win) => {
          cy.stub(win, 'alert').as('windowAlert');
          });
        cy.get('.nav-link').contains('Sign up').click();
        const username = generateRandomString();

        cy.get('#sign-username').typeWithDelay(username);
        cy.get('#sign-password').typeWithDelay('Anish123@123');
    
        cy.get(".btn").contains('Sign up').click();
      
        cy.get('.nav-link').contains('Log in').click();
    
        cy.get('#loginusername').typeWithDelay(username);
        cy.get('#loginpassword').typeWithDelay('Anish123@123');
    
        cy.get(".btn").contains('Log in').click();
    
        cy.get("#logout2").should("be.visible").should('have.text',"Log out")
    
      });
    it('should display product description and add to cart option', () => {
    
        cy.contains('Samsung galaxy s6').click();
  
        cy.url().should('include', 'https://www.demoblaze.com/prod.html?idp_=1');
    
        cy.get('.name').should('have.text','Samsung galaxy s6')
        cy.get('.price-container').should('not.contain', 'No price available');
  
      });
  
    it('should display product description and add to cart option', () => {

      // Click on a specific product
      cy.contains('Samsung galaxy s6').click();

      cy.url().should('include', 'https://www.demoblaze.com/prod.html?idp_=1');
  
      cy.get('.name').should('have.text','Samsung galaxy s6')
      cy.get('.price-container').should('not.contain', 'No price available');

    });

    it('should display product added alert message', () => {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('windowAlert');
            });
        cy.contains('Samsung galaxy s6').click();
  
        cy.url().should('include', 'https://www.demoblaze.com/prod.html?idp_=1');
    
        cy.get('.name').should('have.text','Samsung galaxy s6')
        cy.get('.price-container').should('not.contain', 'No price available');
  
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Product added');
          });
        
        cy.contains('Add to cart').click();

      });

  });

  
  function generateRandomString() {
    const randomString = Math.random().toString(36).substring(7);
    return `user-${randomString}`;
  }