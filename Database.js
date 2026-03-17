const mongoose = require("mongoose")
const ConnectionString = 'mongodb://localhost:27017/'
const ConnectToDb = async () => {
    try {
        await mongoose.connect(ConnectionString)
        console.log("Databse Connected Successfully")
    } catch (error) {
        console.log(`DatabseConnection Failed  `)
        console.error(error)
    }
}
module.exports = ConnectToDb