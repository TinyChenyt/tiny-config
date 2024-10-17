const isExternal = (path) => {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
};

export default { isExternal };