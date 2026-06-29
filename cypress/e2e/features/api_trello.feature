Feature: API Trello
  Como candidato em um teste tecnico
  Quero validar uma API publica com GET
  Para demonstrar automacao de API no Cypress

  @api @smoke @positive
  Scenario: Consultar action existente no Trello
    When envio uma requisicao GET para uma action existente do Trello
    Then o status code da action deve ser 200
    And devo exibir o campo name da estrutura list

  @api @negative
  Scenario: Consultar action inexistente no Trello
    When envio uma requisicao GET para uma action inexistente do Trello
    Then o status code da action inexistente deve indicar erro
