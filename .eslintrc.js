module.exports = {
  extends: ["standard", "prettier"],
  plugins: ["standard", "promise", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-plusplus": "off",
    "no-console": "off"
  },
  env: {
    node: true,
    es6: true
  }
};
