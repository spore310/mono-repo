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
    {
      files: ["src/utils/common/error/**/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/restrict-template-expressions": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "999.999.999",
    },
  },
  ignorePatterns: ["node_modules", "dist", "tsup.config.ts", "jest.config.js"],
}
