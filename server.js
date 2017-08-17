"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes

app.use("/api/users", usersRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.redirect('/menu');
});


app.get("/menu", (req, res) => {
 knex.select('name','price','type').from('dishes').asCallback((err,rows)=>{
    if (err) return console.error(err);
      let templateVars = {
        dishes:rows,
        dish:{}
      }
      knex.select('*').from('dishes').where('name','Billionaire Burger').asCallback((err,row)=>{
         if (err) return console.error(err);
           templateVars.dish = row;

      console.log(templateVars);
      res.render('index',templateVars)
    })
  });

app.get("/menu/:name",(req, res) => {
  console.log(req.params.name);
  knex.select('*').from('dishes').where('name',req.params.name).asCallback((err,row)=>{
     if (err) return console.error(err);
       res.json({
         dish:row[0]
       });
     })
   });
});



app.post("/cart",(req, res) => {
  if(!req.body.name)return console.error('param does not exist');
  console.log(req.body.name);
  for(x in qty){
    knex('menu_cart').insert(
      {
        cart_id: knex.select('id').from('cart').where('owner','Kyle'),
        menu_id: knex.select('id').from('dishes').where('name',req.body.name)
      }).asCallback(function(){

        knex.count("menu_id").from('menu_cart').where('cart_id',
        knex.select('id').from('cart').where('owner','Kyle')).asCallback((err,row)=>{
        if (err) return console.error(err);
          res.json({
            items: row[0]
          });
        });
     });
   }
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
