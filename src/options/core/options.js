let debugOptions;

const getOptionsSchema = browser.runtime
  .sendMessage({ type: "OPTIONS_SCHEMA" })
  .then(res => res.body);

const saveOptions = e => {
  if (e) {
    e.preventDefault();
  }

  // Zip result -> schema
  getOptionsSchema.then(schema => {
    const toSave = schema.keys.reduce((acc, val) => {
      const el = document.getElementById(val.name);
      if (!el) {
        return acc;
      }

      const propMap = {
        [schema.types.BOOL]: "checked",
        [schema.types.VALUE]: "value"
      };
      const fn = val.onSave || (x => x);
      const optionValue = fn(el[propMap[val.type]]);

      return Object.assign(acc, { [val.name]: optionValue });
    }, {});

    browser.storage.local.set(toSave).then(() => {
      browser.runtime.getBackgroundPage().then(w => {
        w.reset();
      });

      document.querySelector(
        "#lastSavedAt"
      ).textContent = new Date().toLocaleTimeString();
    });
  });
};

// Set UI elements' value/checked
const restoreOptionsHandler = (result, schema) => {
  // Zip result -> schema
  const schemaWithValues = schema.keys.map(o =>
    Object.assign({}, o, { value: result[o.name] })
  );

  schemaWithValues.forEach(o => {
    const el = document.getElementById(o.name);
    if (!el) {
      return;
    }

    const fn = o.onOptionsLoad || (x => x);
    const val = typeof o.value === "undefined" ? o.default : fn(o.value);

    const propMap = {
      [schema.types.BOOL]: "checked",
      [schema.types.VALUE]: "value"
    };
    el[propMap[o.type]] = val;
  });

  debugOptions = result;
};

const restoreOptions = () => {
  getOptionsSchema
    .then(schema => {
      const keys = schema.keys.map(o => o.name);
      browser.storage.local
        .get(keys)
        .then(loaded => restoreOptionsHandler(loaded, schema));
    })
    .catch(console.error); // eslint-disable-line
};

document.addEventListener("DOMContentLoaded", restoreOptions);

document.querySelector("#reset").addEventListener("click", e => {
  /* eslint-disable no-alert */
  e.preventDefault();

  const resetFn = w => {
    const reset = w.confirm("Reset settings to defaults?");

    if (reset) {
      browser.storage.local.clear().then(() => {
        document.querySelector(
          "#lastSavedAt"
        ).textContent = new Date().toLocaleTimeString();

        restoreOptions();
        w.alert("Settings have been reset to defaults.");
      });
    }
  };
  /* eslint-enable no-alert */

  if (browser === chrome) {
    browser.runtime.getBackgroundPage().then(resetFn);
  } else {
    resetFn(window);
  }
});

const setupAutosave = el => {
  const autosaveCb = e => {
    saveOptions(e);
  };

  if (["textarea", "text", "number"].includes(el.type)) {
    el.addEventListener("input", autosaveCb);
  } else {
    el.addEventListener("change", autosaveCb);
  }
};

["textarea", "input", "select"].forEach(type => {
  document.querySelectorAll(type).forEach(setupAutosave);
});

const showJson = obj => {
  const json = JSON.stringify(obj, null, 2);
  const outputEl = document.querySelector("#export-target");
  outputEl.style = "display: unset;";
  outputEl.value = json;
};

document.querySelector("#settings-export").addEventListener("click", () => {
  showJson(debugOptions);
});

const importSettings = () => {
  const load = w => {
    getOptionsSchema.then(schema => {
      const json = w.prompt("Paste settings to import");
      try {
        if (json) {
          const settings = JSON.parse(json);
          restoreOptionsHandler(settings, schema);
          w.alert("Settings loaded.");
        }
      } catch (e) {
        w.alert(`Failed to load settings ${e}`);
      }
    });
  };

  if (browser === chrome) {
    browser.runtime.getBackgroundPage().then(load);
  } else {
    load(window);
  }
};
document
  .querySelector("#settings-import")
  .addEventListener("click", importSettings);
