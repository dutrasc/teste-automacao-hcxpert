# Scripts auxiliares

Estes scripts sao apoios estruturais para evidencias e integracao opcional com Xray Cloud. A suite principal continua sendo executada por:

```bash
npm.cmd run cy:run
```

## Captura manual de tela

Captura a tela principal do Windows e salva a imagem na pasta de evidencias da feature informada.

```bash
powershell -ExecutionPolicy Bypass -File scripts/capture-chrome-window.ps1 -Feature login.feature
```

O script nao depende de bibliotecas externas e encerra sem quebrar a entrega caso nao consiga capturar a tela.

## Evidencia da API Trello

Executa um GET na action publica do Trello, valida status code, captura `data.list.name` e gera um HTML em `cypress/evidencias/api_trello.feature/`.

```bash
npm.cmd run evidence:api
```

## Relatorio real

O relatorio HTML da suite e gerado pelo `@badeball/cypress-cucumber-preprocessor` a partir da execucao real do Cypress em `cypress/reports/cucumber-report.html`.

## Xray Cloud

O script `upload-xray.mjs` implementa o fluxo real do Xray Cloud:

1. Autentica em `https://xray.cloud.getxray.app/api/v2/authenticate`.
2. Le o relatorio real `cypress/reports/cucumber-report.json`.
3. Importa o JSON Cucumber em `https://xray.cloud.getxray.app/api/v2/import/execution/cucumber`.
4. O Xray/Jira retorna o resultado real da criacao/importacao da Test Execution.

```bash
npm.cmd run xray:upload
```

Variaveis obrigatorias para upload real:

- `XRAY_CLIENT_ID`
- `XRAY_CLIENT_SECRET`

Variavel opcional/documental para evolucao futura:

- `XRAY_PROJECT_KEY`

Sem `XRAY_CLIENT_ID` ou `XRAY_CLIENT_SECRET`, o script encerra com codigo 0, nao faz chamada HTTP e nao realiza upload. Nenhum resultado e simulado.

Antes de fazer upload real, gere o relatorio Cucumber:

```bash
npm.cmd run cy:run
```

Credenciais nunca devem ser commitadas e nao sao impressas no console.
