const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/databse");

/* //connect To Database
mongoose.connect(config.database)

//On Connection
mongoose.connection.on('connected', () => {
    console.log('conected to database '+ config.database)
})

//On Error
mongoose.connection.on('err', () => {
    console.log('Database error'+ err)
}) */

const app = express();

//DB config
const db = require("./config/keys").MongoURI;

//Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("conected to database "))
  .catch(err => console.log("Database error" + err));

const users = require("./routes/users");
const posts = require("./routes/posts");

//Port Number
const port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Users Routes
app.use("/users", users);
//console.log(users)

//Users Routes
app.use("/api", posts);

//Index Route
app.get("/", (req, res) => {
  ``;
  res.send("Invalid Endpoint.");
  console.log("/ root index route.");
});

// app.get('*', (req,res) => {
//     res.sendfile(path.join(__dirname, 'public/index.html'))
// })

//Start Server
app.listen(port, () => {
  console.log("server started on Port " + port);
});
