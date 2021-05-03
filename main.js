"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "demo-recipe-db";

MongoDB.connect(dbURL, (error, client) => {
  
  if (error) throw error;

  let db = client.db(dbName);
  db.collection("contacts").insertOne({
    name: "Freddie Mercury",
    email: "ffred@queen.com"
  }, (error, data) => {
    if (error) throw error;
    console.log(db);
  });

  db.collection("contacts").find().toArray((error, data) => {
    
    if (error) throw error;
    
    console.log(data);

  });

});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
