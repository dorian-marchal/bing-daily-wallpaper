module.exports = {
  root: true,
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
