# Teste de Automacao HCXpert

Framework de automacao Web e API para teste tecnico, construido com Cypress, JavaScript, Cucumber/BDD, Page Object Model e massa de dados via fixtures.

## Tecnologias

- Cypress 15
- JavaScript
- Cucumber/Gherkin com `@badeball/cypress-cucumber-preprocessor`
- Page Object Model
- Fixtures para massa de dados
- Relatorio HTML real gerado pelo preprocessor Cucumber

## Estrutura do projeto

```text
cypress/
  e2e/
    features/
    step_definitions/
  evidencias/
  fixtures/
  reports/
  support/
    page_objects/
scripts/
  templates/
```

## Instalacao

```bash
npm install
```

## Execucao headless

```bash
npm.cmd run cy:run
```

Ou:

```bash
npm test
```

## Execucao interativa

```bash
npm run cy:open
```

## Execucao no Chrome

```bash
npm run cy:run:chrome
```

## Execucao por tag

Todos os testes rodam por padrao. Para filtrar por tag, use o `--env tags` do preprocessor:

```bash
npm.cmd run cy:run -- --env tags="@api"
npm.cmd run cy:run -- --env tags="@web and @smoke"
npm.cmd run cy:run -- --env tags="@negative"
```

## Relatorio real

A execucao `npm.cmd run cy:run` gera relatorio real a partir do Cucumber/Cypress em:

```text
cypress/reports/cucumber-report.html
```

Tambem e gerado JSON em:

```text
cypress/reports/cucumber-report.json
```

## Evidencias

- Evidencias manuais devem ser salvas por feature em `cypress/evidencias/<feature>/`.
- Screenshots automaticos de falha do Cypress ficam em `cypress/screenshots/`.
- Os screenshots automaticos em `cypress/screenshots/` sao gerados pelo Cypress em falhas durante a execucao, inclusive em tentativas intermediarias quando ha retry configurado. O status final da suite deve ser consultado no relatorio real em `cypress/reports/cucumber-report.html`.
- Evidencia HTML da API Trello pode ser gerada com:

```bash
npm.cmd run evidence:api
```

## Xray

`scripts/upload-xray.mjs` implementa integracao Xray Cloud opcional, real e protegida por variaveis de ambiente. Sem credenciais, nenhuma chamada HTTP e feita e nenhum resultado e simulado. Veja detalhes em `scripts/README.md`.

```bash
npm.cmd run xray:upload
```

## Decisoes tecnicas

As decisoes de arquitetura, robustez, evidencias, limpeza de massa, tags, relatorio real e trade-offs estao documentadas em `DECISOES.md`.

## Observacoes

- O fluxo Web depende do site publico `https://www.automationexercise.com`.
- A API validada e publica e externa ao projeto.
- O checkout valida carrinho/revisao do pedido e nao realiza pagamento real.
- Docker nao faz parte desta etapa.
