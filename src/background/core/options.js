// Short name for convenience
const T = {
  BOOL: "BOOL",
  VALUE: "VALUE"
};

let options = {};

const OptionsManagement = {
  OPTION_TYPES: T, // re-export

  OPTION_KEYS: [
    { name: "foo", type: T.BOOL, default: false },
    {
      name: "bar",
      type: T.VALUE,
      onSave: v => v.trim() || ".",
      default: "baz"
    }
  ],

  getKeys: () =>
    OptionsManagement.OPTION_KEYS.reduce(
      (acc, val) => acc.concat([val.name]),
      []
    ),

  setOption: (name, value) => {
    if (typeof value !== "undefined") {
      options[name] = value;
    }
  },

  loadOptions: () =>
    browser.storage.local
      .get(OptionsManagement.getKeys())
      .then(loadedOptions => {
        if (loadedOptions.debug) {
          window.SI_DEBUG = 1;
        }

        const localKeys = Object.keys(loadedOptions);
        localKeys.forEach(k => {
          const optionType = OptionsManagement.OPTION_KEYS.find(
            ok => ok.name === k
          );
          const fn = optionType.onLoad || (x => x);
          OptionsManagement.setOption(k, fn(loadedOptions[k]));
        });

        return options;
      })
};

options = OptionsManagement.OPTION_KEYS.reduce((acc, val) =>
  Object.assign(acc, { [val.name]: val.default }, {})
);

// Export for testing
if (typeof module !== "undefined") {
  module.exports = OptionsManagement;
}
