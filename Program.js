//Require
const connection = require("./Database");
const prompt = require("prompt");
const configJson = require("console-handler-arquitectura");
const { personModel } = require("./Models/Persona");
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
        console.clear()
        const {personId} = await prompt.get(configJson.getQuestions("delete"));
        await personModel.findByIdAndDelete({_id: personId});
        console.log("Deleted !")
        await consoleWait()
    } catch (e) {
        console.log("Oops! Error, try again! ");
        await consoleWait()
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

//Renderiza el menu principal del JSON (Button: "Principal'")
async function Menu() {
  do {
    console.clear();
    const [principalScreen] = configJson.getScreenByButton("principal");
    configJson.getOptions("principal");

    console.log(principalScreen.title);
    const { answer } = await menuPrincipal();
    const x = answer.trim()
    switch (x.toLowerCase()) {
      case "create":
        await createPerson();
        break;
      case "read":
        console.clear()
        const { answerRead } = await prompt.get(
          configJson.getQuestions("read")
        );
        if (answerRead == "1") await AllPersons();
        if (answerRead == "2") await searchByID();
        break;
      case "update":
        await updatePersonByID();
        break;
      case "delete": 
        await deletePersonByID()
        break
        case "ex": 
        console.clear()
        console.log("Bye byee !! :D")
        await consoleWait();
        process.exit()
        break
    }
  } while (true);
}

Menu();
