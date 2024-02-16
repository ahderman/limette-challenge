const E2E_TEST_USERNAME = 'test-e2e';
const E2E_TEST_PASSWORD = 'pass';

describe('LiMetTe', () => {
  it('should display the login screen when the user is not logged in', () => {
    cy.visit('/');
    cy.get('[data-cy="login-form"]');
  });

  it.skip('should display the main view when the user is logged in', () => {
    cy.visit('/');

    cy.get('[data-cy="login-form"]').within((form) => {
      cy.get('input[name="username"]').type(E2E_TEST_USERNAME);
      cy.get('input[name="password"]').type(E2E_TEST_PASSWORD);
      cy.get('button').click();
    });

    cy.get('[data-cy="appointment-list"]');
  });
});
