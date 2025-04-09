module.exports = {
  root: false, // since this is shared
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off", // not needed for Next.js
    "@typescript-eslint/no-import-type": "off", // not needed for Next.js
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
