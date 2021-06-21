const { leerInput } = require("./helpers/inquirer");

const main = async () => {
  const text = await leerInput();
  console.log(text);
};

main();
