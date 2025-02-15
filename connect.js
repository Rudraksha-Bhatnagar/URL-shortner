const mongoose=require("mongoose");

async function connectTOMongoDb(url){
    return mongoose.connect(url)
}

module.exports={
    connectTOMongoDb
}