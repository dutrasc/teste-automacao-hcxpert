Feature: Adicionar produto ao carrinho
  Como usuario do e-commerce
  Quero adicionar produtos ao carrinho
  Para revisar os itens antes do checkout

  Scenario: Adicionar produto existente ao carrinho
    Given que estou na pagina de produtos para adicionar item
    When busco e adiciono um produto valido ao carrinho
    Then devo ver a confirmacao de produto adicionado
    And devo visualizar o produto adicionado no carrinho

  Scenario: Validar carrinho sem adicionar produto
    Given que estou com o carrinho vazio
    When acesso a pagina do carrinho sem adicionar item
    Then devo visualizar o carrinho vazio
