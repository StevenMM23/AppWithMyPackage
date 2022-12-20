//Read Files
const fs = require("fs");
let myJsonName = "/myJSON.json"
const JsonPath = __dirname + myJsonName
const myDate = fs.readFileSync(JsonPath)
const myDataParse = JSON.parse(myDate);

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

// Validate Screens
function screenValidator(myScreen) {
  if (myScreen.length == 1) return myScreen;
  if (myScreen.length == 0) return "Not found !";

  return "We detect 2 or more screens with the same button name, please change it !";
}

// Get OtherScreen
function getOptions(button) {
  const screenByButton = getScreenByButton(button);
  let options = []
  screenByButton.forEach(({ content }) => {
    content.OtherScreens.forEach((e) => {
      options.push(e);
    });
  });

  options.forEach(({title, button}) => { 
    console.log(` *) ${title} -------> Button: ${button}`)
  })
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

console.log(getAllScreens())
module.exports = { 
    screenValidator, getOptions, getAllScreens, getScreenByButton, getQuestions
}
