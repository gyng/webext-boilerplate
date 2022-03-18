// @ts-check

function generateTranslationKeys() {
  const json = require("./_locales/en/messages.json");
  const keys = Object.keys(json);

  /** @type {Record<string, string>} */
  const map = {};
  keys.forEach((k) => {
    map[k] = `__MSG_${k}__`;
  });

  return `export enum TL {\n${Object.entries(map)
    .map(([key, val]) => `  ${key} = "${val}",\n`)
    .join("")}}`;
}

if (require.main === module) {
  console.log(generateTranslationKeys());
}

module.exports = {
  genKeys: generateTranslationKeys,
};
