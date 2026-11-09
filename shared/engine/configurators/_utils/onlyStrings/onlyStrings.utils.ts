export const onlyStrings = (o: Object) => {
  return Object.keys(o).reduce((acc, key) => {
    if (typeof o[key] === 'string') {
      acc[key] = o[key];
    } else if (typeof o[key] === 'object') {
      acc[key] = onlyStrings(o[key]);
    }
    return acc;
  }, {});
}
