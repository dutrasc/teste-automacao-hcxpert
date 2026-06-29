# Evidencias

Esta pasta segue a estrutura sugerida no enunciado para organizacao de evidencias por feature.

As subpastas representam cada feature automatizada:

- `add_to_cart.feature`
- `api_trello.feature`
- `checkout.feature`
- `login.feature`
- `search.feature`

Screenshots automaticos do Cypress sao gerados em caso de falha durante a execucao dos testes.

Prints manuais de browser inteiro, se necessarios, devem ser salvos na subpasta da feature correspondente.

O relatorio HTML real da execucao Cucumber/Cypress e gerado em `cypress/reports/cucumber-report.html` apos `npm.cmd run cy:run`.

Os screenshots automaticos de falha ficam em `cypress/screenshots/`.

Os screenshots automaticos em `cypress/screenshots/` sao gerados pelo Cypress em falhas durante a execucao, inclusive em tentativas intermediarias quando ha retry configurado. O status final da suite deve ser consultado no relatorio real em `cypress/reports/cucumber-report.html`.
