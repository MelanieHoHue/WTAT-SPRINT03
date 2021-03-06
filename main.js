"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  subscribersController = require("./controllers/subscribersController");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/demo-recipe-db",
  {useNewUrlParser: true}
  );

const db = mongoose.connection;

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

//app.get("/contact", homeController.showSignUp);
//app.post("/contact", homeController.postedSignUpForm);

app.get("/contact", subscribersController.getSubcriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber); 

app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  let answer = req.data;
  console.log(answer);
  res.render("subscribers", {subscribers: answer});
})

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

