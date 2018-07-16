import { OPTION_KEYS, OptionType, options } from "./options.js";
import { reset } from "./index";
export var MessageType;
(function (MessageType) {
    MessageType["OPTIONS"] = "OPTIONS";
    MessageType["OPTIONS_SCHEMA"] = "OPTIONS_SCHEMA";
    MessageType["RELOAD"] = "RELOAD";
    MessageType["FOO"] = "FOO";
})(MessageType || (MessageType = {}));
export const emit = {
    foo: (value) => {
        browser.runtime.sendMessage({
            type: MessageType.FOO,
            body: { value }
        });
    }
};
const listener = (requestObj, sender, sendResponse) => {
    const request = requestObj;
    switch (request.type) {
        case MessageType.OPTIONS:
            sendResponse({
                type: MessageType.OPTIONS,
                body: options
            });
            break;
        case MessageType.OPTIONS_SCHEMA:
            sendResponse({
                type: MessageType.OPTIONS_SCHEMA,
                body: {
                    keys: OPTION_KEYS,
                    types: OptionType
                }
            });
            break;
        case MessageType.RELOAD:
            reset();
            break;
        default:
            break; // noop
    }
};
export const listen = () => browser.runtime.onMessage.addListener(listener);
export const stop = () => browser.runtime.onMessage.removeListener(listener);
//# sourceMappingURL=messaging.js.map