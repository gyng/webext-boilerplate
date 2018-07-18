import {
  OptionType,
  OptionTypePrim
} from "@src/background/core/options";
import {
  IMessageOptionsSchema,
  MessageType
} from "@src/background/core/messaging";

const getAttributeForOptionType = (type: OptionType): "checked" | "value" => {
  const ATTR_MAP: { [k in OptionType]: "checked" | "value" } = {
    [OptionType.BOOLEAN]: "checked",
    [OptionType.STRING]: "value"
  };
  return ATTR_MAP[type];
};

export const getOptionsSchema = browser.runtime
  .sendMessage({ type: MessageType.OPTIONS_SCHEMA })
  .then((res: IMessageOptionsSchema) => res.body);

// export const getOptions = browser.runtime
//   .sendMessage({ type: MessageType.OPTIONS })
//   .then((res: IMessageOptions) => res.body);

// export const getAllOptions = Promise.all([getOptions, getOptionsSchema]).then(values => {
//   const [options, schema] = values;
//   return { options, schema };
// });

// const saveOptions = (e?: Event) => {
//   if (e) {
//     e.preventDefault();
//   }

//   // Zip result -> schema
//   getOptionsSchema
//     .then(payload => {
//       // Assign to a variable so we can get a reference to it when exporting and saving to localStorage
//       const toSave: typeof options = Object.keys(payload.keys).reduce(
//         (acc, name) => {
//           const optionSchemata = payload.keys[name];
//           const el = <HTMLInputElement>document.getElementById(name);
//           if (!el) {
//             return acc;
//           }

//           const onSave = optionSchemata.onSave || ((x: any) => x);
//           const attribute = getAttributeForOptionType(optionSchemata.type);
//           const attributeValue = el[attribute];
//           const optionValue: OptionTypePrim = onSave(attributeValue);

//           return Object.assign(acc, { [name]: optionValue });
//         },
//         {}
//       );

//       browser.storage.local.set(toSave).then(() => {
//         browser.runtime
//           .sendMessage({ type: MessageType.RELOAD })
//           .then(() => {
//             const lastSavedAtEl = document.querySelector("#lastSavedAt");

//             if (lastSavedAtEl) {
//               lastSavedAtEl.textContent = new Date().toLocaleTimeString();
//             }
//           })
//       });
//     })
//     .catch(console.error);
// };

// Set UI elements' value/checked
export const restoreOptionsHandler = (
  loadedOptions: browser.storage.StorageObject,
  payload: IMessageOptionsSchema["body"]
) => {
  const populatedOptions = Object.keys(payload.schema).map(key => ({
    name: key,
    value: loadedOptions[key],
    onOptionsLoad: payload.schema[key].onLoad,
    default: payload.schema[key].default,
    type: payload.schema[key].type
  }));

  populatedOptions.forEach(opt => {
    const el = <HTMLInputElement>document.getElementById(opt.name);
    if (!el) {
      return;
    }

    const fn = opt.onOptionsLoad || (x => x);
    const val = typeof opt.value === "undefined" ? opt.default : fn(opt.value);
    const attribute = getAttributeForOptionType(opt.type);
    el.setAttribute(attribute, String(val));

    if (el.type === "textarea") {
      el.innerText = String(val);
    }
  });
};

export const restoreOptions = () => {
  return getOptionsSchema
    .then(payload => {
      const keys = Object.keys(payload.schema);
      browser.storage.local
        .get(keys)
        .then(loadedOptions => restoreOptionsHandler(loadedOptions, payload));
    })
    .catch(console.error);
};

const resetEl = document.querySelector("#reset");

if (resetEl) {
  resetEl.addEventListener("click", e => {
    e.preventDefault();

    const resetFn = (win: Window) => {
      const reset = win.confirm("Reset settings to defaults?");

      if (reset) {
        const lastSavedAtEl = document.querySelector("#lastSavedAt");

        browser.storage.local.clear().then(() => {
          if (lastSavedAtEl) {
            lastSavedAtEl.textContent = new Date().toLocaleTimeString();
          }

          restoreOptions();
          win.alert("Settings have been reset to defaults.");
        });
      }
    };

    // @ts-ignore
    if (browser === chrome) {
      browser.runtime.getBackgroundPage().then(resetFn);
    } else {
      resetFn(window);
    }
  });
}

// const setupAutosaveHandler = (el: HTMLFormElement) => {
//   const autosaveCb = (e?: Event) => {
//     saveOptions(e);
//   };

//   if (["textarea", "text", "number"].includes(el.type)) {
//     el.addEventListener("input", autosaveCb);
//   } else {
//     el.addEventListener("change", autosaveCb);
//   }
// };

// export const setupAutosave = () => {
//   ["textarea", "input", "select"].forEach(type => {
//     const nodeList = document.querySelectorAll(type);
//     Array.prototype.forEach.call(nodeList, setupAutosaveHandler);
//   });
// };
