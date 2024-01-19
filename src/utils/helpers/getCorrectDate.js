export const getCorrectDate = (str) => {
  const [date] = str.split("T");
  date.split('').reverse().join('');

  return date.replaceAll("-", ".")
}
