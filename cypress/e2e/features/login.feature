Feature: Login
  Como candidato em um teste tecnico
  Quero validar login positivo e negativo
  Para demonstrar automacao Web com BDD

  Scenario: Login com credenciais validas
    Given que estou na pagina de cadastro e login
    And existe uma conta valida criada para login
    When realizo login com a conta valida
    Then devo visualizar o usuario logado

  Scenario: Login com credenciais invalidas
    Given que estou na pagina de cadastro e login
    When realizo login com credenciais invalidas
    Then devo visualizar mensagem de erro de login
