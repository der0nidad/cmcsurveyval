const strToCamel = (s) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const strToSnake = (string) => string.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();

export function toCamel(o) {
  let newO;
  let origKey;
  let newKey;
  let value;
  if (o instanceof Array) {
    return o.map((item) => {
      if (typeof item === 'object') {
        item = toCamel(item);
      }
      return item;
    });
  }
  newO = {};
  for (origKey in o) {
    if (o.hasOwnProperty(origKey)) {
      newKey = strToCamel(origKey);
      value = o[origKey];
      if (value instanceof Array || (value !== null && value.constructor === Object)) {
        value = toCamel(value);
      }
      newO[newKey] = value;
    }
  }

  return newO;
}
