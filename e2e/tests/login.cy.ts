describe('login and logout', () => {
  const E2E_TEST_USERNAME = 'testUser';
  const E2E_TEST_PASSWORD = 'pw';

  function logIn(username: string, password: string) {
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button').click();
    });
  }

  it('should display the login screen when the user is not logged in', () => {
    cy.task('clearDb');
    cy.task('createTestUser');

    cy.visit('/');
    cy.get('[data-cy="login-form"]');
  });

  it('should log in when correct credentials are provided', () => {
    cy.task('clearDb');
    cy.task('createTestUser');

    cy.visit('/');
    logIn(E2E_TEST_USERNAME, E2E_TEST_PASSWORD);

    cy.get('[data-cy="appointment-list"]');
  });

  it('should fail to log in when wrong credentials are provided', () => {
    cy.task('clearDb');
    cy.task('createTestUser');

    cy.visit('/');
    logIn('wrong username', 'wrong password');

    cy.get('[data-cy="login-error-message"]');
  });

  it('should display the main view when the user is logged in', () => {
    cy.task('clearDb');
    cy.task('createTestUser');

    cy.visit('/');
    logIn(E2E_TEST_USERNAME, E2E_TEST_PASSWORD);
    cy.get('[data-cy="appointment-list"]');

    cy.visit('/');
    cy.get('[data-cy="appointment-list"]');
  });
});
