export const getSlicedText = (maxLength, text) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`
};
