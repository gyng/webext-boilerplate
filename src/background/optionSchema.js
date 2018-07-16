const OPTION_KEYS = [
  { name: "foo", type: T.BOOL, default: false },
  {
    name: "bar",
    type: T.VALUE,
    onSave: v => v.trim() || ".",
    default: "baz"
  }
];

// Export for testing
if (typeof module !== "undefined") {
  module.exports = OPTION_KEYS;
}
