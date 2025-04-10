module.exports = {
  root: false, // since this is shared
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier", "security", "node", "sonarjs"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off", // not needed for Next.js
    "@typescript-eslint/no-import-type": "off", // not needed for Next.js
    "security/detect-buffer-noassert": "warn",
    "security/detect-child-process": "warn",
    "security/detect-disable-mustache-escape": "warn",
    "security/detect-eval-with-expression": "warn",
    "security/detect-new-buffer": "warn",
    "security/detect-no-csrf-before-method-override": "warn",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-non-literal-require": "warn",
    "security/detect-object-injection": "warn",
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-pseudoRandomBytes": "warn",
    "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }], // Flag repeated string literals (over 5 times)
    "sonarjs/no-identical-functions": "warn", // Detect copy-paste methods
    "sonarjs/no-collapsible-if": "warn", // Collapse nested `if`s
    "sonarjs/no-small-switch": "warn", // Detect suspicious small switch blocks
    "sonarjs/cognitive-complexity": ["warn", 15], // Warn on complex functions
  },
  ignorePatterns: ["__tests__/**", "__mocks__/**", "dist/**", "node_modules/**"],
  settings: {
    react: {
      version: "detect",
    },
  },
}
