"use strict";

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const usersRoutes = require("./routes/sms");
const usersRoutes = require("./routes/cart");
const app = express();

//twilio variables
const accountSid = process.env.TWILIO_KEY;
const authToken = process.env.TWILIO_SECRET;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const myNumber = process.env.VERIFIED_NUMBER;
const twiNumber = process.env.TWILIO_NUMBER;

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

//helper functions
function respond(message, callback) {
  //generate twiml message and continue code after message is sent
  var twiml = new MessagingResponse();
  twiml.message(message);
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  callback()
  //respond with the message header
  res.end(twiml.toString)
}

//function to use when user has yet to receive any messages
function message(message, to, from, callback) {
  client.messages.create({
    to: to,
    from: from,
    body: message
  }).then((message) => console.log(message.sid));
  callback();
}

//routes for the twilio sms service
app.use("/sms", usersRoutes(knex));

//routes shopping cart
app.use("/cart", usersRoutes(knex));

//routes for the menu
app.get("/", (req, res) => {
  knex.select('name', 'price', 'type').from('dishes').asCallback((err, rows) => {
    if (err) return console.error(err);
    let templateVars = {
      dishes: rows,
      dish: {},
      addons: {}
    }
    knex.select('*').from('dishes').where('name', 'Billionaire Burger').asCallback((err, row) => {
      if (err) return console.error(err);
      templateVars.dish = row;
      knex.select('name', 'price', 'pic').from('dishes').where('type', 'sides').asCallback((err, sides) => {
        templateVars.addons = sides;
        res.render('index', templateVars)
      });
    });
  });
});

//detail view
app.get("/menu/:name", (req, res) => {
  knex.select('*').from('dishes').where('name', req.params.name).asCallback((err, row) => {
    if (err) return console.error(err);
    res.json({
      dish: row[0]
    });
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
