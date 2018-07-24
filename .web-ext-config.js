module.exports = {
  // Global options:
  verbose: true,
  // Command options:
  build: {
    overwriteDest: true
  },
  run: {
    firefox: "stable",
    startUrl: ["about:addons", "about:debugging"]
  },

  ignoreFiles: []
};
