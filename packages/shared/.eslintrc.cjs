module.exports = {
  root: true,
  extends: ["@monorepoeslint/eslint-config"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "no-console": "warn",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },

  overrides: [
    {
      files: ["src/**/*.ts"],
      rules: {
        "node/no-unsupported-features/es-syntax": "off",
        "node/no-missing-import": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "999.999.999",
    },
  },
}
