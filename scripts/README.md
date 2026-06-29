# Scripts auxiliares

Estes scripts sao apoios estruturais para evidencias e futura integracao com Xray. A suite principal continua sendo executada por:

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

## Xray

Valida se as variaveis `XRAY_CLIENT_ID`, `XRAY_CLIENT_SECRET` e `XRAY_PROJECT_KEY` existem no ambiente. Sem essas variaveis, o script informa que a integracao esta preparada, mas pendente de credenciais, e encerra com codigo 0.

```bash
npm.cmd run xray:upload
```

Nenhum upload real para Xray e feito nesta etapa.
