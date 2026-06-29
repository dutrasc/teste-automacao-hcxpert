Feature: Checkout
  Como usuario do e-commerce
  Quero revisar o pedido no checkout
  Para validar os produtos antes do pagamento

  Scenario: Validar produto na revisao do pedido
    Given que estou autenticado para revisar o pedido
    When adiciono um produto e prossigo para o checkout
    Then devo visualizar o produto na revisao do pedido

  Scenario: Tentar checkout sem estar autenticado
    Given que adicionei um produto no carrinho sem login
    When tento prosseguir para o checkout sem autenticacao
    Then devo visualizar a solicitacao de cadastro ou login
