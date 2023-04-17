// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const logger = require('./logger.service')
module.exports = {
  getCollection,
  connect,
}
async function getCollection(collectionName) {
  try {
    return await db.collection(collectionName)
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  mongoose.connect(
      process.env.DB_URI.replace("<password>", process.env.DB_PASS),
      (err) => {
        if(err) throw err;
        console.log("connected to MONGODB");
      }
  );
}