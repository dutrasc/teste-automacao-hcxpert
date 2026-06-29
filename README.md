# Teste de Automacao HCXpert

Framework de automacao com Cypress, JavaScript e Cucumber/BDD cobrindo desafios Web e API.

## Tecnologias

- Cypress
- JavaScript
- Cucumber/Gherkin com `@badeball/cypress-cucumber-preprocessor`
- Page Object Model
- Fixtures para massa de dados

## Estrutura

```text
cypress/
  e2e/
    features/
    step_definitions/
  fixtures/
  support/
    page_objects/
```

## Instalacao

```bash
npm install
```

## Execucao

Abrir Cypress em modo interativo:

```bash
npm run cy:open
```

Executar todos os testes em modo headless:

```bash
npm run cy:run
```

Executar no Chrome:

```bash
npm run cy:run:chrome
```

Alias de teste:

```bash
npm test
```

## Cenarios implementados

- Login
  - Positivo: cria uma conta temporaria via API de apoio do Automation Exercise e realiza login pela interface Web.
  - Negativo: tenta login com credenciais invalidas e valida a mensagem de erro.
- Busca de produto
  - Positivo: busca produto existente e valida exibicao nos resultados.
  - Negativo: busca produto inexistente e valida ausencia do produto.
- Carrinho
  - Positivo: adiciona produto existente e valida item no carrinho.
  - Negativo: acessa carrinho sem adicionar produto e valida carrinho vazio.
- Checkout
  - Positivo: cria usuario temporario via API de apoio, faz login pela interface Web, adiciona produto e valida a revisao do pedido sem finalizar pagamento.
  - Negativo: tenta seguir para checkout sem login e valida solicitacao de cadastro/login.
- API Trello
  - Positivo: executa GET em `https://api.trello.com/1/actions/592f11060f95a3d3d46a987a`, valida status 200 e exibe `data.list.name`.
  - Negativo: executa GET em action inexistente e valida status de erro.

## Massa de dados

A massa fica em `cypress/fixtures/users.json`.

As contas validas usadas nos cenarios positivos sao criadas dinamicamente pela API de apoio do site `automationexercise.com`, com e-mails unicos gerados durante a execucao. A validacao de login continua sendo feita pela interface Web.

## Observacoes

- O fluxo Web depende da disponibilidade do site publico `https://www.automationexercise.com`.
- Se houver indisponibilidade, lentidao ou alteracao de layout/seletores no site externo, os testes Web podem falhar mesmo com a configuracao correta.
- O checkout valida somente carrinho/revisao do pedido. Pagamento real nao foi implementado.
- Xray, Docker e pipeline CI/CD nao fazem parte desta primeira versao.
