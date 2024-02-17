import { logInTestUser } from '/e2e/support/testHelpers';

describe('appointments', () => {
  it('should only display appointments of the logged in user', () => {
    cy.task('clearDb');
    cy.task('createTestUser');
    cy.task('createOtherUser');
    cy.task('createAppointments');
    cy.visit('/');
    logInTestUser();

    cy.get('[data-cy="appointment-list"]').contains('Clark');
    cy.get('[data-cy="appointment-list"]').contains('Bruce');
    cy.get('[data-cy="appointment-list"]')
      .contains('Peter')
      .should('not.exist');
    cy.get('[data-cy="appointment-list"]')
      .contains('Steve')
      .should('not.exist');
  });

  it('should only show names that match the filter text', () => {
    cy.task('clearDb');
    cy.task('createTestUser');
    cy.task('createOtherUser');
    cy.task('createAppointments');
    cy.visit('/');
    logInTestUser();

    // Filter by first name
    cy.get('[data-cy="appointment-filter"]').type('cla');
    cy.get('[data-cy="appointment-list"]').contains('Clark');
    cy.get('[data-cy="appointment-list"]')
      .contains('Bruce')
      .should('not.exist');

    // Filter by last name
    cy.get('[data-cy="appointment-filter"]').clear();
    cy.get('[data-cy="appointment-filter"]').type('way');
    cy.get('[data-cy="appointment-list"]').contains('Bruce');
    cy.get('[data-cy="appointment-list"]')
      .contains('Clark')
      .should('not.exist');
  });
});
