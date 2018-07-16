export var OptionType;
(function (OptionType) {
    OptionType["BOOLEAN"] = "BOOLEAN";
    OptionType["STRING"] = "STRING";
})(OptionType || (OptionType = {}));
export const OPTION_KEYS = {
    foo: { type: OptionType.BOOLEAN, default: false },
    bar: {
        type: OptionType.STRING,
        onSave: (v) => v.trim() || ".",
        default: "baz"
    }
};
export const getKeys = () => Object.keys(OPTION_KEYS);
export const setOption = (name, value) => {
    if (typeof value !== "undefined") {
        options[name] = value;
    }
};
export const loadOptions = () => browser.storage.local.get(getKeys()).then(loadedOptions => {
    const localKeys = Object.keys(loadedOptions);
    localKeys.forEach(key => {
        const option = OPTION_KEYS[key];
        const onLoad = option.onLoad || (x => x);
        const value = onLoad(loadedOptions[key]);
        setOption(key, value);
    });
    return options;
});
// Initialised to default options
export let options = Object.keys(OPTION_KEYS).reduce((acc, val) => Object.assign(acc, { [val]: OPTION_KEYS[val].default }), {});
//# sourceMappingURL=options.js.map