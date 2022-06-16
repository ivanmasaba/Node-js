
const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient
const url = "mongodb://127.0.0.1:27017/"

mongoclient.connect(  url, ( err, client ) => { 
  if( err ){
    return
  }else{
   const db = client.db("ivanz");

   db.collection("users").insertOne({
    name: "andy",
    age: 22
   })
   .then(res => console.log( res ))
   .catch(err => console.log(err) )


  }

 }  )