(function contentScript() {
  chrome.runtime.sendMessage(
    {
      type: "OPTIONS"
    },
    response => {
      if (!response || !response.body) {
        return;
      }

      const options = response.body;

      console.log("Hello from the content script!"); // eslint-disable-line
      console.log("Options: ", options); // eslint-disable-line
    }
  );
})();
