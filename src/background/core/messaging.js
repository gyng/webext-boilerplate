/* eslint-disable no-case-declarations */

const MESSAGE_TYPES = {
  OPTIONS: "OPTIONS",
  OPTIONS_SCHEMA: "OPTIONS_SCHEMA",
  FOO: "FOO"
};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case MESSAGE_TYPES.OPTIONS:
      sendResponse({
        type: MESSAGE_TYPES.OPTIONS,
        body: options
      });
      break;
    case MESSAGE_TYPES.OPTIONS_SCHEMA:
      sendResponse({
        type: MESSAGE_TYPES.OPTIONS_SCHEMA,
        body: {
          keys: OptionsManagement.OPTION_KEYS,
          types: OptionsManagement.OPTION_TYPES
        }
      });
      break;
    default:
      break; // noop
  }
});

const Messaging = {
  // Fires off and does not expect a return value
  emit: {
    foo: state => {
      browser.runtime.sendMessage({
        type: MESSAGE_TYPES.FOO,
        body: { state }
      });
    }
  }
};

// Export for testing
if (typeof module !== "undefined") {
  module.exports = Messaging;
}
