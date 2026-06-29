Feature: Busca de produto
  Como usuario do e-commerce
  Quero buscar produtos
  Para encontrar itens disponiveis para compra

  @web @smoke @positive
  Scenario: Buscar produto existente
    Given que estou na pagina de produtos para busca
    When busco por um produto existente
    Then devo visualizar o produto nos resultados

  @web @negative
  Scenario: Buscar produto inexistente
    Given que estou na pagina de produtos para busca
    When busco por um produto inexistente
    Then nao devo visualizar produto com o nome pesquisado
