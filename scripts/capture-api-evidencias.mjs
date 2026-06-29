import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const actionUrl = "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a";
const outputDir = join(__dirname, "..", "cypress", "evidencias", "api_trello.feature");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputFile = join(outputDir, `api-trello-evidence-${timestamp}.html`);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTemplate(template, values) {
  return Object.entries(values).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, escapeHtml(value)),
    template
  );
}

const headerTemplate = await readFile(join(__dirname, "templates", "api-evidence-01.html"), "utf8");
const bodyTemplate = await readFile(join(__dirname, "templates", "api-evidence-02.html"), "utf8");

console.log(`Executando GET: ${actionUrl}`);

const response = await fetch(actionUrl);
const responseBody = await response.json();
const listName = responseBody?.data?.list?.name;

if (response.status !== 200) {
  throw new Error(`Status code inesperado: ${response.status}`);
}

if (!listName) {
  throw new Error("Campo data.list.name nao encontrado na resposta da API.");
}

await mkdir(outputDir, { recursive: true });

const values = {
  generatedAt: new Date().toLocaleString("pt-BR"),
  method: "GET",
  url: actionUrl,
  status: response.status,
  listName,
  responseBody: JSON.stringify(responseBody, null, 2),
};

const html = `${renderTemplate(headerTemplate, values)}\n${renderTemplate(bodyTemplate, values)}`;

await writeFile(outputFile, html, "utf8");

console.log(`Status code validado: ${response.status}`);
console.log(`data.list.name: ${listName}`);
console.log(`Evidencia HTML gerada em: ${outputFile}`);
