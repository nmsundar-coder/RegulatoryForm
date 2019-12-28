// Declaring needed modules for the project
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var passport = require("passport");
var mongoose = require("mongoose");
var config = require("./config/database");

//Initialize app variable
var app = express();

// Set Static module

app.use(express.static(path.join(__dirname, "public")));

//Initialize static variables
const port = 9003;

//Database connect and event for database connection
mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("Database Connected " + config.database);
});

mongoose.connection.on("error", err => {
  console.log("Database error occured" + err);
});

// Defining Routes

var users = require("./routes/users");
var annualDisclosure = require("./routes/annualDisclosureInterTrading");


//Using modules
app.use(cors());
app.use(bodyParser.json());
app.use("/users", users);
app.use("/annualDisclosure", annualDisclosure);
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Start server at declared port

app.listen(port, () => {
  console.log("Server started at " + port);
});

// Route API for /
app.get("/", (req, res) => {
  res.send("Invalid EndPoint, Please refer to manual for correct endpoint");
});
