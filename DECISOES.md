# Decisoes Tecnicas

## Relatorio real de execucao

Foi removido o gerador estatico `scripts/generate-report.mjs` porque ele fixava numeros no codigo. O projeto usa o HTML e JSON gerados pelo `@badeball/cypress-cucumber-preprocessor`, suportados pela versao instalada, para que o relatorio reflita a execucao real.

Trade-off: o relatorio depende da conclusao do `cypress run`, mas elimina risco de evidenciar resultado fabricado.

## Remocao de dependencias nao usadas

`dotenv` e `multiple-cucumber-html-reporter` foram removidos porque nao eram usados na execucao real. Isso reduz superficie de manutencao e evita sugerir capacidade inexistente.

Trade-off: caso a integracao evolua para variaveis em arquivo `.env` ou relatorio customizado, as dependencias devem ser reintroduzidas com uso real.

## Limpeza de massa em hook

Usuarios criados para os cenarios positivos agora sao registrados e removidos em hook `After`. A limpeza roda mesmo se o cenario falhar e nao mascara a falha principal se a exclusao encontrar instabilidade externa.

Trade-off: a limpeza fica menos visivel no Gherkin, mas passa a ser responsabilidade tecnica do framework.

## Login positivo com criacao via API

O login positivo cria usuario pela API de apoio do Automation Exercise e valida o login pela interface. Essa decisao evita instabilidade de conta compartilhada e mantem a validacao critica pela UI.

Trade-off: o cadastro visual nao e coberto nesse cenario, mas o objetivo do fluxo de login fica mais deterministico.

## Negativo do carrinho

O negativo de carrinho passou a validar que um produto existente nao adicionado nao aparece no carrinho. Isso testa melhor o requisito de inclusao seletiva do que apenas abrir carrinho vazio.

Trade-off: o cenario continua simples, mas cobre uma condicao negativa diretamente relacionada ao desafio de adicionar produto.

## Retries e screenshots

Foi configurado `retries: { runMode: 2, openMode: 0 }` e mantido `screenshotOnRunFailure`. Isso reduz flake em execucao headless contra site externo sem esconder falhas durante desenvolvimento interativo.

Trade-off: retries podem aumentar tempo de execucao em falhas reais, mas melhoram estabilidade em ambiente externo.

## Video desativado

Video permanece desativado para evitar peso desnecessario no projeto. Screenshots de falha e relatorio HTML atendem melhor ao escopo atual.

Trade-off: ha menos contexto visual continuo, mas o repositario fica mais leve.

## Seletores de produto

As validacoes de presenca e ausencia de produto usam a mesma regiao `.features_items`. Isso reduz falso positivo causado por procurar em regioes diferentes da pagina.

Trade-off: a validacao fica acoplada a uma area especifica do site, mas melhora consistencia.

## Clique no add to cart

O `force: true` foi mantido com comentario porque o site usa overlay de hover para o botao de carrinho, comportamento que pode ser instavel em headless. A decisao favorece estabilidade contra um site publico externo.

Trade-off: o clique fica menos proximo da interacao visual real, mas reduz flake sem usar espera fixa.

## URLs centralizadas

As URLs da API Trello usadas pelos testes Cypress foram movidas para `env` em `cypress.config.js`. Isso evita hardcode em step definitions e facilita manutencao.

Trade-off: a configuracao concentra detalhes tecnicos, mas o Gherkin e os steps ficam mais legiveis.

## Xray Cloud opcional

`scripts/upload-xray.mjs` agora implementa uma integracao real com Xray Cloud, protegida por variaveis de ambiente. Sem `XRAY_CLIENT_ID` ou `XRAY_CLIENT_SECRET`, nenhuma chamada HTTP e feita, o script encerra com sucesso e nao simula upload.

Trade-off: a integracao nao foi executada nesta entrega por nao haver instancia/credenciais Xray disponiveis, mas usa como payload o relatorio real do Cucumber em `cypress/reports/cucumber-report.json`.

Observacao tecnica: para os resultados mapearem em Tests existentes, os testes Cucumber precisam ser previamente criados/exportados do Xray. Caso contrario, a importacao pode criar novos Tests/Test Executions conforme o comportamento da API do Xray Cloud.

## GitHub Actions

Foi criado um workflow simples para rodar a suite em `push` e `pull_request`. Como o alvo Web e um site externo publico, o CI pode sofrer com indisponibilidade, latencia ou mudanca de layout fora do controle do projeto.

Trade-off: aumenta confiabilidade de entrega, mas a estabilidade final ainda depende do ambiente externo.

## Tags BDD

Foram adicionadas tags simples como `@web`, `@api`, `@smoke`, `@positive` e `@negative`. Elas permitem execucao seletiva sem complicar a execucao padrao.

Trade-off: exige disciplina para manter tags coerentes ao criar novos cenarios.

## Contrato da API Trello

O teste positivo da API Trello agora valida contrato minimo da resposta: estrutura `data`, `data.list`, campos de lista/cartao/quadro, identificador da action, tipo e data parseavel. Isso aumenta robustez porque detecta mudancas silenciosas na forma da resposta, nao apenas status code.

Trade-off: a validacao foi feita manualmente para nao adicionar dependencia nova de schema validation; ela e legivel e suficiente para o teste tecnico, mas menos reutilizavel que um validador JSON Schema dedicado.

## Flake do login negativo

A causa provavel do flake era interacao com o formulario antes de todos os elementos estarem visiveis, habilitados e estabilizados apos a navegacao para Signup/Login. O Page Object de login passou a validar titulo, inputs e botao antes de digitar/clicar, e a mensagem negativa e validada por seletor de paragrafo visivel.

Trade-off: retries continuam configurados como rede de seguranca para site externo, mas a correcao prioriza estado real da tela em vez de depender do retry.

## Camada dedicada de API

Setup e cleanup de usuarios do Automation Exercise foram extraidos para `cypress/support/api/automationExerciseApi.js`. Isso separa chamadas de API de comandos gerais de UI e deixa `commands.js` focado no suporte ao browser.

Trade-off: a arquitetura ganha um arquivo a mais, mas melhora coesao e reduz duplicacao de caminho de cleanup.

## Carrinho com multiplos itens

Foi adicionado um unico cenario de regressao para adicionar dois produtos e validar ambos no carrinho. Esse fluxo representa risco real porque carrinhos frequentemente falham em acumulacao, quantidade ou sobrescrita de itens.

Trade-off: adiciona cobertura relevante sem aumentar muito o volume da suite nem depender de login ou pagamento.

## Artefatos automaticos fora do versionamento

`cypress/reports/` e `cypress/screenshots/` permanecem ignorados pelo Git; evidencias manuais em `cypress/evidencias/` continuam versionaveis. No CI, relatorios e screenshots sao publicados como artifacts.

Trade-off: o repositorio fica limpo, mas evidencias automaticas devem ser consultadas localmente ou nos artifacts do workflow.

## npm ci --legacy-peer-deps no CI

O CI mantem `npm ci --legacy-peer-deps` porque `@badeball/cypress-cucumber-preprocessor@25.0.0` declara peer dependency ate Cypress `15.17.0`, enquanto o projeto usa Cypress `15.18.0` e ja foi validado localmente. Remover a flag quebraria a instalacao antes dos testes.

Trade-off: a flag contorna um conflito de peer range conhecido, mas deve ser removida quando as versoes forem alinhadas oficialmente.

## Lint enxuto

Foi adicionado ESLint com configuracao flat simples para JavaScript, Cypress e scripts Node. O lint melhora manutencao ao detectar variaveis nao usadas e globais incorretas antes da execucao.

Trade-off: adiciona uma etapa ao CI e uma devDependency, mas evita reformatacao massiva e mantem o escopo controlado.

## Smoke no CI

A execucao por tag `@smoke` foi avaliada, mas nao adicionada ao CI para evitar duplicar tempo de execucao. A suite completa ja roda no workflow e as tags seguem disponiveis para execucao seletiva local.

Trade-off: o CI fica simples e direto, mas nao produz uma trilha separada de smoke.
