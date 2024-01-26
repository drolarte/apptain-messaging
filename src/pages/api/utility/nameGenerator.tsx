const generateRandomName = () => {
  const surnames = ["Doe", "Morato", "Shelby", "Son", "Curry"];
  const firstnames = ["Steph", "Roce", "Thomas", "John", "Chae"];
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const firstname = firstnames[Math.floor(Math.random() * firstnames.length)];

  const randomName = `${firstname} ${surname}`;
  return randomName;
};

export default generateRandomName;
