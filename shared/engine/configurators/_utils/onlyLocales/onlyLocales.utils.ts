export const onlyLocales = (o: Object) => {
  return Object.keys(o).reduce((acc, key) => {
    if (typeof o[key] === 'string') {
      acc[key] = o[key];
    } else if (typeof o[key] === 'object') {
      acc[key] = onlyLocales(o[key]);
    }
    return acc;
  }, {});
}
