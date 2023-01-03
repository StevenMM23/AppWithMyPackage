//Require
const connection = require("./Database");
const prompt = require("prompt");
const configJson = require("console-handler-arquitectura");
const { personModel } = require("./Models/Persona");
const path = require("path")
connection();

prompt.start();

//Funcion que para la consola (Console.ReadKey()) ----> Equivalente
async function consoleWait() {
  await prompt.get([
    {
      name: "message",
      description: "Press Any Key to Continue",
      message: "Press Any Key",
    },
  ]);
}

async function menuPrincipal() {
  let answer = await prompt.get(configJson.getQuestions("principal"));
  return answer;
}

// Renderiza el Screen de Create y guarda nuevo usuario (C)
async function createPerson() {
  try {
    console.clear();
    const { username, lastname, age, email } = await prompt.get(
      configJson.getQuestions("create")
    );

    const person = new personModel({
      username,
      lastname,
      age,
      email,
    });
    await person.save();
    console.clear();
    console.log("Created !");
    await consoleWait();
  } catch (e) {
    console.log("Oops! An Error occured");
  }
}

//Listar todas las personas                             (R)
async function AllPersons() {
  try {
    console.clear();
    const getAll = await personModel.find({});
    console.log(getAll);

    await consoleWait();
  } catch (e) {
    console.clear();
    console.log("Oops ! Error, try again !");
    await consoleWait();
  }
}

//Actualiza a la persona por su ID                      (U)
async function updatePersonByID() {
  try {
    console.clear();
    const { personId } = await prompt.get(configJson.getQuestions("update"));
    const personSearched = await personModel.findById(personId);
    if (personSearched.length != 0) {
      const { username, lastname, age, email } = await prompt.get(
        configJson.getQuestions("create")
      );

      await personModel.findByIdAndUpdate(personId, {
        username,
        lastname,
        age,
        email,
      });

      console.log("Updated ! ");
      await consoleWait();
    } else {
      console.log("Not found !");
      await consoleWait();
    }
  } catch (e) {
    console.log("Oops ! Error");
    await consoleWait();
  }
}
//Elimina una person por su ID                          (D)
async function deletePersonByID() {
  try {
    console.clear();
    const { personId } = await prompt.get(configJson.getQuestions("delete"));
    await personModel.findByIdAndDelete({ _id: personId });
    console.log("Deleted !");
    await consoleWait();
  } catch (e) {
    console.log("Oops! Error, try again! ");
    await consoleWait();
  }
}
//Buscar por ID de la persona
async function searchByID() {
  try {
    console.clear();
    const { clientId } = await prompt.get([
      {
        name: "clientId",
        description: "Introduce the ID",
        message: "Cannot be Empty",
        required: true,
      },
    ]);
    const client = await personModel.findById({ _id: clientId });

    if (client == null) {
      console.log("Not found !");
      await consoleWait();
    } else {
      console.log(client);
      await consoleWait();
    }
  } catch (e) {
    console.log("Oops! Error, try again! ");
    await consoleWait();
  }
}

async function exportQuestions(name, data){ 
  await configJson.exportToJSON(name, data);
}

//Obtiene que funcion esta manejando ese boton
async function FunctionHandler(button) {
  const handler = configJson.GetHandlerByButton(button);

  switch (handler.toLowerCase()) {
    case "createperson":
      return createPerson();
    case "readperson":
      const { answerRead } = await prompt.get(configJson.getQuestions("read"));
      if (answerRead == "1") return AllPersons();
      if (answerRead == "2") return searchByID();
    case "deleteperson":
      return deletePersonByID();
    case "updateperson":
      return updatePersonByID();
    case "exportperson":
      return exportQuestions("myData2", await personModel.find({}));
    case "changepath":
      return configJson.changePathJSON(
        path.join(__dirname, "myData2.JSON"),
        "C:\\Users\\estev\\Desktop\\New folder\\AppWithMyPackage\\Carpeta Demostracion\\myData2.JSON"
      );
      await consoleWait();
    default: {
      console.log("Handler no encontrado ! ");
      await consoleWait();
    }
  }
}
//Renderiza el menu principal del JSON (Button: "Principal'")
async function Menu() {
  do {
    console.clear();
    const [principalScreen] = configJson.getScreenByButton("principal");
    configJson.getOptionsColor("magenta", "principal");

    configJson.consoleLogColor("blue", principalScreen.title);
    const { answer } = await menuPrincipal();
    const x = answer.trim();
    switch (x.toLowerCase()) {
      case "create":
        await FunctionHandler(x);
        break;
      case "read":
        await FunctionHandler(x);
        break;
      case "update":
        await FunctionHandler(x);
        break;
      case "delete":
        await FunctionHandler(x);
        break;
      case "export":
        await FunctionHandler(x);
        break;
      case "change":
        await FunctionHandler(x);
        break;
      case "ex":
        console.clear();
        configJson.consoleLogColor("Blue", "Hasta Luego !");
        await consoleWait();
        process.exit();
      default:
        configJson.consoleLogColor(
          "red",
          "No se identifico una pantalla con ese boton"
        );
        await consoleWait();
        break;
    }
  } while (true);
}

Menu();
