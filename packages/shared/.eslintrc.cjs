module.exports = {
  root: true,
  extends: ["@monorepoeslint/eslint-config"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/console-error": "off",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "999.999.999",
    },
  },
}
