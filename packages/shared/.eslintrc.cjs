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
      files: ["src/**/*.ts", "__tests__/**/*.test.tsx"],
    },
  ],
  settings: {
    react: {
      version: "999.999.999",
    },
  },
}
