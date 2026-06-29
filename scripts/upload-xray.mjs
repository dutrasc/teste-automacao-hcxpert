import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const authenticateUrl = "https://xray.cloud.getxray.app/api/v2/authenticate";
const importUrl = "https://xray.cloud.getxray.app/api/v2/import/execution/cucumber";
const reportPath = join(__dirname, "..", "cypress", "reports", "cucumber-report.json");
const requiredVariables = ["XRAY_CLIENT_ID", "XRAY_CLIENT_SECRET"];
const optionalVariables = ["XRAY_PROJECT_KEY"];

function getMissingRequiredVariables() {
  return requiredVariables.filter((variableName) => !process.env[variableName]);
}

async function ensureReportExists() {
  try {
    await access(reportPath, constants.R_OK);
  } catch {
    throw new Error(
      `Relatorio Cucumber nao encontrado em ${reportPath}. Execute npm.cmd run cy:run antes do upload para o Xray.`
    );
  }
}

async function authenticate() {
  const response = await fetch(authenticateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.XRAY_CLIENT_ID,
      client_secret: process.env.XRAY_CLIENT_SECRET,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error(`Falha na autenticacao Xray. Status HTTP: ${response.status}`);
    console.error(responseText);
    process.exit(1);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("Resposta de autenticacao Xray nao retornou um token JSON valido.");
  }
}

async function importCucumberReport(token, reportContent) {
  const response = await fetch(importUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: reportContent,
  });

  const responseText = await response.text();

  console.log(`Status HTTP Xray import: ${response.status}`);
  console.log("Resposta Xray:");
  console.log(responseText);

  if (!response.ok) {
    process.exit(1);
  }
}

const missingVariables = getMissingRequiredVariables();

if (missingVariables.length > 0) {
  console.log("Integracao Xray Cloud implementada, mas pendente de credenciais/instancia Xray.");
  console.log(`Variaveis obrigatorias para upload real: ${requiredVariables.join(", ")}`);
  console.log(`Variavel opcional para evolucao futura: ${optionalVariables.join(", ")}`);
  console.log(`Variaveis obrigatorias ausentes: ${missingVariables.join(", ")}`);
  console.log("Nenhuma chamada HTTP foi feita e nenhum upload foi realizado.");
  process.exit(0);
}

try {
  await ensureReportExists();

  const reportContent = await readFile(reportPath, "utf8");

  console.log(`Relatorio Cucumber encontrado em: ${reportPath}`);
  console.log("Autenticando no Xray Cloud...");
  const token = await authenticate();

  console.log("Importando relatorio Cucumber no Xray Cloud...");
  await importCucumberReport(token, reportContent);
} catch (error) {
  console.error("Erro ao executar upload para Xray Cloud.");
  console.error(error.message);
  process.exit(1);
}
