module.exports = {
  escapeQuotes: string => `"${string.replace(/"/g, `""`)}"`,
};
