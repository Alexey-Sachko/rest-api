import MongoClient from 'mongodb';

const MONGO_URL = "mongodb://localhost:27017";

function connectMongodb(app) {
  //MongoClient.connect(MONGO_URL)
      // .then((connection) => {
      //     console.log(connection);
      //     app.people = connection.collection("people");
      //     console.log("Database connection established")
      // })
      // .catch((err) => console.error(err))

  
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
    if(err) {
      console.error(err);
    } else {
      const db = client.db('test');
      app.users = db.collection("users");
      
      process.on("SIGINT", () => {
        MongoClient.close();
        process.exit();
      });
    }
  })
};

export default connectMongodb;