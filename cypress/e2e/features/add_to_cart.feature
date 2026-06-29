Feature: Adicionar produto ao carrinho
  Como usuario do e-commerce
  Quero adicionar produtos ao carrinho
  Para revisar os itens antes do checkout

  @web @smoke @positive
  Scenario: Adicionar produto existente ao carrinho
    Given que estou na pagina de produtos para adicionar item
    When busco e adiciono um produto valido ao carrinho
    Then devo ver a confirmacao de produto adicionado
    And devo visualizar o produto adicionado no carrinho

  @web @negative
  Scenario: Validar que produto nao adicionado nao aparece no carrinho
    Given que estou na pagina de produtos para adicionar item
    When adiciono apenas um produto ao carrinho
    Then devo visualizar apenas o produto adicionado no carrinho
    And nao devo visualizar outro produto nao adicionado no carrinho
