const browserGlobals = {
  console: "readonly",
  fetch: "readonly",
  URLSearchParams: "readonly",
};

const cypressGlobals = {
  beforeEach: "readonly",
  cy: "readonly",
  Cypress: "readonly",
  expect: "readonly",
};

const nodeGlobals = {
  process: "readonly",
  Buffer: "readonly",
};

export default [
  {
    ignores: [
      "node_modules/**",
      "cypress/reports/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
      "cypress/downloads/**",
    ],
  },
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...browserGlobals,
        ...cypressGlobals,
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["scripts/**/*.mjs", "eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["cypress.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
