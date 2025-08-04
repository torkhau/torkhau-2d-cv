export const uncapitalize = (str) => {
  if (typeof str !== 'string') throw new TypeError('Expected a string');
  
  return str.charAt(0).toLowerCase() + str.slice(1);
};
