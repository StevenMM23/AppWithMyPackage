//Necesitamos instalar Mongoose
const mongoose = require("mongoose");

async function connectMongoDB() {

  await mongoose.set("strictQuery", true);
  await mongoose
    .connect("mongodb://127.0.0.1:27017/PersonCRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => console.log("Error"));
}

module.exports = connectMongoDB;
