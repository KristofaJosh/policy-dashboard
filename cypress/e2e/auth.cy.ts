describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/auth/login', {
      fixture: 'user.json',
    }).as('loginRequest');
  });

  test('given; a user visits the login page; should be able to login with valid credentials', () => {
    // Visit the login page
    cy.visit('/auth');

    // Fill in the login form
    cy.get('input[name="username"]').type('admin@security.com');
    cy.get('input[name="password"]').type('password');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for the login request to complete
    cy.wait('@loginRequest');
    
    // Check that the user is redirected to the dashboard
    cy.url().should('include', '/dashboard');
  });

  test('given; a user enters invalid credentials; should see an error message', () => {
    // Intercept the login request with an error response
    cy.intercept('POST', 'http://localhost:3001/api/v1/auth/login', {
      statusCode: 401,
      body: {
        success: false,
        error: 'Invalid email or password',
        data: null,
      },
    }).as('failedLoginRequest');
    
    // Visit the login page
    cy.visit('/auth');
    
    // Fill in the login form with invalid credentials
    cy.get('input[name="username"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for the login request to complete
    cy.wait('@failedLoginRequest');
    
    // Check that an error message is displayed
    cy.get('[role="alert"]').should('contain', 'Invalid email or password');
    
    // Check that the user is still on the login page
    cy.url().should('include', '/auth');
  });

  test('given; a user is logged in; should be able to logout', () => {
    // Intercept the logout request
    cy.intercept('POST', 'http://localhost:3001/api/v1/auth/logout', {
      statusCode: 200,
      body: {
        success: true,
        error: null,
      },
    }).as('logoutRequest');
    
    // Login first
    cy.login();
    
    // Click the logout button (assuming it's in the account dropdown)
    cy.get('[data-testid="account-dropdown"]').click();
    cy.get('[data-testid="logout-button"]').click();
    
    // Wait for the logout request to complete
    cy.wait('@logoutRequest');
    
    // Check that the user is redirected to the login page
    cy.url().should('include', '/auth');
  });
});