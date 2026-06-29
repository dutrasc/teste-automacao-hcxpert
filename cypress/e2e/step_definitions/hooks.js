import { After } from "@badeball/cypress-cucumber-preprocessor";
import { clearCreatedUsers, getCreatedUsers } from "../../support/testUsers";

After(() => {
  const users = getCreatedUsers();

  if (!users.length) {
    return;
  }

  cy.wrap(users, { log: false })
    .each(({ email, password }) => {
      cy.cleanupAutomationExerciseUser(email, password);
    })
    .then(() => {
      clearCreatedUsers();
    });
});
