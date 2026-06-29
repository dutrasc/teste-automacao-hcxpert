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

## Xray opcional

`scripts/upload-xray.mjs` foi mantido como esqueleto seguro. Sem `XRAY_CLIENT_ID`, `XRAY_CLIENT_SECRET` e `XRAY_PROJECT_KEY`, ele informa pendencia de credenciais e encerra com sucesso sem upload real.

Trade-off: a integracao ainda nao entrega rastreabilidade automatica, mas nao simula envio inexistente.

## GitHub Actions

Foi criado um workflow simples para rodar a suite em `push` e `pull_request`. Como o alvo Web e um site externo publico, o CI pode sofrer com indisponibilidade, latencia ou mudanca de layout fora do controle do projeto.

Trade-off: aumenta confiabilidade de entrega, mas a estabilidade final ainda depende do ambiente externo.

## Tags BDD

Foram adicionadas tags simples como `@web`, `@api`, `@smoke`, `@positive` e `@negative`. Elas permitem execucao seletiva sem complicar a execucao padrao.

Trade-off: exige disciplina para manter tags coerentes ao criar novos cenarios.
