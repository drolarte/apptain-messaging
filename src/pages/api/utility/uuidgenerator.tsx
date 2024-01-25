const generateUUID = () => {
  const hexDigits = '0123456789abcdef';
  const getRandomHexDigit = () => hexDigits[Math.floor(Math.random() * 16)];

  const sections = [8, 4, 4, 4, 12]; // Length of each section in the UUID
  const uuid = sections
    .map((sectionSize) =>
      Array.from({ length: sectionSize }, () => getRandomHexDigit()).join('')
    )
    .join('-');

  return uuid;
};

export default generateUUID;
