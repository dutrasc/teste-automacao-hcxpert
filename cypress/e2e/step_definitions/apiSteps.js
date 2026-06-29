import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let trelloResponse;

function expectNonEmptyString(value, fieldName) {
  expect(value, fieldName).to.be.a("string").and.not.be.empty;
}

function expectValidDateString(value, fieldName) {
  expectNonEmptyString(value, fieldName);
  expect(Date.parse(value), `${fieldName} parseavel`).to.not.be.NaN;
}

function validateTrelloActionContract(body) {
  expect(body).to.be.an("object");
  expect(body).to.have.property("data").that.is.an("object");
  expect(body.data).to.have.property("list").that.is.an("object");
  expectNonEmptyString(body.data.list.name, "data.list.name");
  expectNonEmptyString(body.data.list.id, "data.list.id");
  expect(body.data).to.have.property("board").that.is.an("object");
  expectNonEmptyString(body.data.board.name, "data.board.name");
  expect(body.data).to.have.property("card").that.is.an("object");
  expectNonEmptyString(body.data.card.name, "data.card.name");
  expectNonEmptyString(body.id, "id");
  expectNonEmptyString(body.type, "type");
  expectValidDateString(body.date, "date");
}

When("envio uma requisicao GET para uma action existente do Trello", () => {
  cy.request({
    method: "GET",
    url: Cypress.env("trelloActionUrl"),
  }).then((response) => {
    trelloResponse = response;
  });
});

Then("o status code da action deve ser 200", () => {
  expect(trelloResponse.status).to.eq(200);
  validateTrelloActionContract(trelloResponse.body);
});

Then("devo exibir o campo name da estrutura list", () => {
  expect(trelloResponse.body).to.have.nested.property("data.list.name");
  cy.log(`Nome da lista: ${trelloResponse.body.data.list.name}`);
  console.log("Nome da lista:", trelloResponse.body.data.list.name);
});

When("envio uma requisicao GET para uma action inexistente do Trello", () => {
  cy.request({
    method: "GET",
    url: Cypress.env("trelloInvalidActionUrl"),
    failOnStatusCode: false,
  }).then((response) => {
    trelloResponse = response;
  });
});

Then("o status code da action inexistente deve indicar erro", () => {
  expect(trelloResponse.status).to.be.oneOf([400, 404]);
  expect(trelloResponse.body).to.not.be.empty;
});
