module.exports = {
  extends: ["standard", "prettier"],
  plugins: ["standard", "promise", "prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  env: {
    node: true,
    es6: true
  }
};
