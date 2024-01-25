const generateRandomName = () => {
    const surnames = ["Doe", "Morato", "Shelby", "Son", "Curry"];
    const firstnames = ["Steph", "Roce", "Thomas", "John", "Chae"];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const firstname = firstnames[Math.floor(Math.random() * firstnames.length)];
    return ` ${firstname} ${surname} `;
  };
  
  export default generateRandomName;
  