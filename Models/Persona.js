const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({ 
    username: { 
        type: String,
        require: true
    },
    lastname: { 
        type: String,
        require: true
    },
    Age : { 
        type: String,
        require: true
    },
    email: { 
        type: String, 
        require: true
    },
    createdAt : { 
        type: Date,
        default: Date.now
    }
})

const personModel = mongoose.model("Person", personSchema)

module.exports = { 
    personModel
}