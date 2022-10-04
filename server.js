const express = require("express");
const app = express();
const mongodb = require("mongodb");
require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const DB = "Newdb";

//middleware
app.use(express.json());


app.get("/",function(req,res){
    res.send('<h1>Welcome Buddy!!!.</h1>');
})


app.post("/mentor",async function(req,res){

    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        await db.collection("mentor").insertOne(req.body);
        await connection.close()
        res.status(200).json({Message:"Mentor is Created Done"});

    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
})

app.get("/mentor-all",async function(req,res){

    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const Mentors =  await db.collection("mentor").find({},{"_id":1,"Mentor_name":1,"Class_spl":0,"Age":0,"Students":1,"Rating":0,"Award":0,"Spl_Talent":0}).toArray();
        await connection.close()
        res.status(200).json(Mentors);

    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
})

app.post("/student",async function(req,res){

    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB); 
        await db.collection("student").insertOne(req.body);
        await connection.close();
        res.status(200).json({Message:"Student create Done"});

    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})

app.get("/students-all",async function(req,res){

    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB); 
        const Students =await db.collection("student").find().toArray();
        await connection.close();
        res.status(200).json(Students);

    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})

app.put("/Assign_Mentor/:id",async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const edit = await db.collection("student").findOneAndUpdate({_id:mongoDB.ObjectId(req.params.id)},{$set:req.body});
        await connection.close()

        res.json(edit)
    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})

app.put("/Assign_student/:id",async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const edit = await db.collection("mentor").findOneAndUpdate({_id:mongoDB.ObjectId(req.params.id)},{$set:req.body});
        await connection.close()

        res.json(edit)
    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
})

app.get("/mentor/:id",async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const mentor = await db.collection("mentor").findOne({_id:mongoDB.ObjectId(req.params.id)});
        await connection.close()
        res.status(200).json(mentor);

    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
})

app.get("/student/:id",async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const mentor = await db.collection("student").findOne({_id:mongoDB.ObjectId(req.params.id)});
        await connection.close()
        res.status(200).json(mentor);

    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
})

app.delete("/mentor/:id", async function (req, res) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db(DB);
      let user = await db
        .collection("mentor")
        .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
      await connection.close();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  });

  app.delete("/student/:id", async function (req, res) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db(DB);
      let user = await db
        .collection("student")
        .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
      await connection.close();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  });

app.listen(process.env.PORT ||7000);