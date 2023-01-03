//Read Files
const fs = require("fs");
let myJsonName = "/myJSON.json";
const JsonPath = __dirname + myJsonName;
const myDate = fs.readFileSync(JsonPath);
const myDataParse = JSON.parse(myDate);

const colours = [
  { reset: "\x1b[0m" },
  { black: "\x1b[30m" },
  { red: "\x1b[31m" },
  { green: "\x1b[32m" },
  { yellow: "\x1b[33m" },
  { blue: "\x1b[34m" },
  { magenta: "\x1b[35m" },
  { cyan: "\x1b[36m" },
  { white: "\x1b[37m" },
  { gray: "\x1b[90m" },
  { crimson: "\x1b[38m" },
];

//Get All Screens
function getAllScreens() {
  const conf = myDataParse;
  const screens = [];
  conf.forEach((element) => {
    screens.push(element);
  });

  return screens;
}

//Get Screen by Button
function getScreenByButton(button) {
  const allScreens = getAllScreens();
  const myScreen = [];
  allScreens.forEach((element) => {
    if (button.toLowerCase() == element.button.toLowerCase())
      myScreen.push(element);
  });

  return screenValidator(myScreen);
}

//Get Screen by screen name
function getScreenByName(screenName) {
  const AllScreens = getAllScreens();
  const myScreenByName = [];
  AllScreens.forEach((element) => {
    if (screenName.toLowerCase() == element.name.toLowerCase())
      myScreenByName.push(element);
  });

  return screenValidator(myScreenByName);
}

// Validate Screens
function screenValidator(myScreen) {
  if (myScreen.length == 1) return myScreen;
  if (myScreen.length == 0) return "Not found !";

  return "We detect 2 or more screens with the same button name or screen name, please change it !";
}

// Get OtherScreen
function getOptions(button) {
  const screenByButton = getScreenByButton(button);
  let options = [];
  screenByButton.forEach(({ content }) => {
    content.OtherScreens.forEach((e) => {
      options.push(e);
    });
  });

  options.forEach(({ title, button: { name } }) => {
    console.log(` *) ${title} -------> Button: ${name}`);
  });
}

// Get Questions
function getQuestions(button) {
  const screen = getScreenByButton(button);
  let myQuestions;
  screen.forEach(({ content }) => {
    myQuestions = content.questions;
  });

  return myQuestions;
}

//Return the principal menu with the color selected
function getOptionsColor(colorName, button) {
  const screenByButton = getScreenByButton(button);
  let options = [];
  screenByButton.forEach(({ content }) => {
    content.OtherScreens.forEach((e) => {
      options.push(e);
    });
  });

  options.forEach(({ title, button: { name } }) => {
    consoleLogColor(colorName, ` *) ${title} --------> Button: ${name}`);
  });
}

//Get Handler by Button
function GetHandlerByButton(buttonName) {
  const principalScreen = getScreenByButton("principal");
  let handler = "";

  principalScreen.forEach(({ content: { OtherScreens } }) => {
    OtherScreens.forEach(({ button }) => {
      if (buttonName.toLowerCase() == button.name.toLowerCase())
        handler = button.handler;
    });
  });

  return handler;
}

//Return console.log with the color that you selected
function consoleLogColor(colorName, text) {
  let reset = Object.values(colours[0]).toString();
  let selectedColor = reset;
  colours.forEach((e) => {
    if (
      colorName.toString().toLowerCase() ==
      Object.keys(e).toString().toLowerCase()
    ) {
      selectedColor = Object.values(e).toString();
    }
  });

  return console.log(selectedColor, text, reset);
}

//Export the data to JSON File
function exportToJSON(nameFile, data) {
  const myData = JSON.stringify(data);
  fs.writeFileSync(`${nameFile}.JSON`, myData, () =>
    console.log("No se ha podido crear el archivo con los datos enviados")
  );
  console.log("Tus datos han sido exportados !");
}

//Change de JSON location and create a history
function changePathJSON(oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath);
    fs.writeFileSync("historyPath.JSON", JSON.stringify(newPath));
  } catch (e) {
    console.log("No se ha podido realizar la accion");
  }
}


module.exports = {
  screenValidator,
  getOptions,
  getAllScreens,
  getScreenByButton,
  getQuestions,
  GetHandlerByButton,
  getScreenByName,
  getOptionsColor,
  consoleLogColor,
  exportToJSON,
  changePathJSON,
};
