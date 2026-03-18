const mongoose = require("mongoose")
const ConnectionString = process.env.MONGO_URL
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
