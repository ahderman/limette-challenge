export function logInTestUser() {
  const E2E_TEST_USERNAME = 'testUser';
  const E2E_TEST_PASSWORD = 'pw';

  cy.get('[data-cy="login-form"]').within(() => {
    cy.get('input[name="username"]').type(E2E_TEST_USERNAME);
    cy.get('input[name="password"]').type(E2E_TEST_PASSWORD);
    cy.get('button').click();
  });
}
