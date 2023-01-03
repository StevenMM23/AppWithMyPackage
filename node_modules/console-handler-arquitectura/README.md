## Installation

To install the package you need to open the terminal of your code editor and run the command npm.

        npm install console-handler-arquitectura
	const consoleHandler = require("console-handler-arquitectura")

## Documentation

The main focus of the library is the **JSON** that is downloaded. As an example we can take the main screen:

    {
    "title": "Welcome to Main Screen! :D",
    "name": "principalScreen",
    "button": "principal",
    "content": {
      "questions": [
        {
          "description": "Type the name of the button of the function you want to access",
          "message": "Select something valid",
          "name": "answer",
          "required": true
        }
      ],
      "OtherScreens": [
        {
          "title": "Create a person",
          "button": {
            "name": "create",
            "handler": "CreatePerson",
            "callScreen": "createScreen"
          }
        },
        {
          "title": "See all the persons",
          "button": {
            "name": "read",
            "handler": "ReadPerson",
            "callScreen": "readScreen"
          }
        },
        {
          "title": "Update a person",
          "button": {
            "name": "update",
            "handler": "UpdatePerson",
            "callScreen": "updateScreen"
          }
        },
        {
          "title": "delete a person",
          "button": {
            "name": "delete",
            "handler": "DeletePerson",
            "callScreen": "deleteScreen"
          }
        },
        {
          "title": "Exit",
          "button": { "name": "ex", "handler": "exit", "callScreen": "" }
        }
      ]
    }

}

- We need to have the name of the button of the screen we want to display.
- In case the screen has questions, we need to enter content and questions.

## Things to considerate:

- You can only access the interfaces by entering the name of the buttons correctly (lower or upper case is irrelevant).
- The command 'ex' terminates the execution of the program.
- The other screens can be accessed through the main screen.

## Methods

- **getquestions(button)**

With this function we can get the questions we have inside a screen in the JSON file.

- **getAllScreen()**

With this function we can get all the screens we have created in the JSON file returning them as an array.

- **getScreenByButton(button)**

With this function we obtain the screen that we want to show in the console, First this screen has been created previously.

- **getScreenByScreenName(button)**

With this function we obtain the screen that we want to show in the console introducing by a parameter the name of the screen

- **GetHandlerByButton(button)**

With this function we obtain the handler that have the button inside

- **getOptions(button)**

With this function we can obtain access to the list of other screens that a screen has, we can have as an example the main screen that has access to the screenName and buttons of other screens.

    "OtherScreens": [
        {
          "title": "Create a person",
          "button": {
            "name": "create",
            "handler": "CreatePerson",
            "callScreen": "createScreen"
          }
        },
        {
          "title": "See all the persons",
          "button": {
            "name": "read",
            "handler": "ReadPerson",
            "callScreen": "readScreen"
          }
        },
        {
          "title": "Update a person",
          "button": {
            "name": "update",
            "handler": "UpdatePerson",
            "callScreen": "updateScreen"
          }
        },
        {
          "title": "delete a person",
          "button": {
            "name": "delete",
            "handler": "DeletePerson",
            "callScreen": "deleteScreen"
          }
        },
        {
          "title": "Exit",
          "button": { "name": "ex", "handler": "exit", "callScreen": "" }
        }
    ]

- **getOptionsColor(color, button)**

With this function we can obtain access to the list of other screens that a screen has and decide witch color you want to display

- **consoleLogColor(color, text)**

This function allows us to print in the console the text that we want next to the color that has been selected.

- **exportToJSON(nameFile, data)**

With this function we can export the data to a JSON file. 

- **changePathJSON(oldPath, newPath)**

With this function we can move the exported file to the place of our preference, also it will create a history with the location where the file was moved to.

