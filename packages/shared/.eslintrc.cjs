module.exports = {
  root: true,
  extends: ["@monorepoeslint/eslint-config"],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
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
