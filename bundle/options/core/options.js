import { OptionType } from "../../background/core/options.js";
import { MessageType } from "../../background/core/messaging.js";
let debugOptions;
const ATTR_MAP = {
    [OptionType.BOOLEAN]: "checked",
    [OptionType.STRING]: "value"
};
const getOptionsSchema = browser.runtime
    .sendMessage({ type: MessageType.OPTIONS_SCHEMA })
    .then((res) => res.body);
const saveOptions = e => {
    if (e) {
        e.preventDefault();
    }
    // Zip result -> schema
    getOptionsSchema.then(payload => {
        // Assign to a variable so we can get a reference to it when exporting and saving to localStorage
        const toSave = Object.keys(payload.keys).reduce((acc, name) => {
            const optionSchemata = payload.keys[name];
            const el = document.getElementById(name);
            if (!el) {
                return acc;
            }
            const onSave = optionSchemata.onSave || (x => x);
            const attribute = ATTR_MAP[optionSchemata.type];
            const attributeValue = el[attribute];
            const optionValue = onSave(attributeValue);
            return Object.assign(acc, { [name]: optionValue });
        }, {});
        // const toSave = schema.keys.reduce((acc, val) => {
        //   const el = document.getElementById(val.name);
        //   if (!el) {
        //     return acc;
        //   }
        //   const ATTR_MAP = {
        //     [schema.types.BOOL]: "checked",
        //     [schema.types.VALUE]: "value"
        //   };
        //   const fn = val.onSave || (x => x);
        //   const optionValue = fn(el[ATTR_MAP[val.type]]);
        //   return Object.assign(acc, { [val.name]: optionValue });
        // }, {});
        debugOptions = toSave;
        browser.storage.local.set(toSave).then(() => {
            browser.runtime.sendMessage({ type: MessageType.RELOAD })
                .then(() => {
                const lastSavedAtEl = document.querySelector("#lastSavedAt");
                if (lastSavedAtEl) {
                    lastSavedAtEl.textContent = new Date().toLocaleTimeString();
                }
            })
                .catch(console.error);
            // browser.runtime.getBackgroundPage().then(w => {
            //   w.reset();
            // });
        });
    })
        .catch(console.error);
};
// Set UI elements' value/checked
const restoreOptionsHandler = (result, payload) => {
    // Zip result -> schema
    const schemaWithValues = payload.keys.map(o => Object.assign({}, o, { value: result[o.name] }));
    schemaWithValues.forEach(o => {
        const el = document.getElementById(o.name);
        if (!el) {
            return;
        }
        const fn = o.onOptionsLoad || (x => x);
        const val = typeof o.value === "undefined" ? o.default : fn(o.value);
        el[ATTR_MAP[o.type]] = val;
    });
    debugOptions = result;
};
const restoreOptions = () => {
    getOptionsSchema
        .then(payload => {
        const keys = Object.keys(payload.keys);
        browser.storage.local
            .get(keys)
            .then(loaded => restoreOptionsHandler(loaded, payload));
    })
        .catch(console.error); // eslint-disable-line
};
document.addEventListener("DOMContentLoaded", restoreOptions);
const resetEl = document.querySelector("#reset");
if (resetEl) {
    resetEl.addEventListener("click", e => {
        /* eslint-disable no-alert */
        e.preventDefault();
        const resetFn = w => {
            const reset = w.confirm("Reset settings to defaults?");
            if (reset) {
                const lastSavedAtEl = document.querySelector("#lastSavedAt");
                browser.storage.local.clear().then(() => {
                    if (lastSavedAtEl) {
                        lastSavedAtEl.textContent = new Date().toLocaleTimeString();
                    }
                    restoreOptions();
                    w.alert("Settings have been reset to defaults.");
                });
            }
        };
        /* eslint-enable no-alert */
        // @ts-ignore
        if (browser === chrome) {
            browser.runtime.getBackgroundPage().then(resetFn);
        }
        else {
            resetFn(window);
        }
    });
}
const setupAutosave = el => {
    const autosaveCb = e => {
        saveOptions(e);
    };
    if (["textarea", "text", "number"].includes(el.type)) {
        el.addEventListener("input", autosaveCb);
    }
    else {
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
            }
            catch (e) {
                w.alert(`Failed to load settings ${e}`);
            }
        });
    };
    if (browser === chrome) {
        browser.runtime.getBackgroundPage().then(load);
    }
    else {
        load(window);
    }
};
document
    .querySelector("#settings-import")
    .addEventListener("click", importSettings);
//# sourceMappingURL=options.js.map