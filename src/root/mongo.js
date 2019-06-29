import MongoClient from 'mongodb';
import mongoose from 'mongoose';

const MONGO_URL = "mongodb://localhost:27017/test";
const Schema = mongoose.Schema;

const userScheme = new Schema({
  name: { type: String, unique: true },
  password: String
}, {versionKey: false});

function connectMongodb(app) {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
    if(err) {
      console.error(err);
    } else {

      app.User = mongoose.model("User", userScheme);   

      process.on("SIGINT", () => {
        mongoose.disconnect();
        process.exit();
      });
    }
  })
};

export default connectMongodb;