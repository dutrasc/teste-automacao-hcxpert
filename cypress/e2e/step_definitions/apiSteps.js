import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let trelloResponse;

When("envio uma requisicao GET para uma action existente do Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
  }).then((response) => {
    trelloResponse = response;
  });
});

Then("o status code da action deve ser 200", () => {
  expect(trelloResponse.status).to.eq(200);
});

Then("devo exibir o campo name da estrutura list", () => {
  expect(trelloResponse.body).to.have.nested.property("data.list.name");
  cy.log(`Nome da lista: ${trelloResponse.body.data.list.name}`);
  // eslint-disable-next-line no-console
  console.log("Nome da lista:", trelloResponse.body.data.list.name);
});

When("envio uma requisicao GET para uma action inexistente do Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/action-inexistente",
    failOnStatusCode: false,
  }).then((response) => {
    trelloResponse = response;
  });
});

Then("o status code da action inexistente deve indicar erro", () => {
  expect(trelloResponse.status).to.be.oneOf([400, 404]);
});
