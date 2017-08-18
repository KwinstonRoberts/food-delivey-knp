"use strict";

if(process.env.ENV === 'development')require('dotenv').config();

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


const accountSid = process.env.TWILIO_KEY;
const authToken =  process.env.TWILIO_SECRET;
const client = require('twilio')(accountSid, authToken);


app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post("/order", (req, res) => {
  client.messages.create({
      to: '+16477619205',
      from: '+14508230998',
      body: `Your order has been placed. Thank you for choosing Zuckerburger.
            `,
  }, function(err,message){
    if(err)console.error(err)
        console.log(message);
      });
});

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

  knex('menu_cart').insert({
    cart_id: knex.select('id').from('cart').where('owner','Kyle'),
    menu_id: knex.select('id').from('dishes').where('name',req.body.name),
    quantity: req.body.quantity
  }).asCallback((err)=>{
    if (err) return console.error(err);
    knex.countDistinct("menu_id").from('menu_cart').where('cart_id',knex.select('id').from('cart').where('owner','Kyle')).asCallback((err,row)=>{
      if (err) return console.error(err);
          res.json({
            items: row[0]
          });
        });
      });
    });

app.get("/cart", (req, res) => {
  knex('dishes')
  .leftJoin('menu_cart','dishes.id','menu_cart.menu_id')
  .leftJoin('cart','menu_cart.cart_id','cart.id')
  .select('name','price', 'menu_cart.quantity as quantity').distinct()
  .whereNotNull('quantity')
  .asCallback((err,rows)=>{
    console.log(rows)
    let templateVars = {
      // cart: [{name: 'Face Burger',
      //     pic: '/images/faceBurger.jpg',
      //     price:17.00,
      //     description:' Face Burger is our signiture dish. Mark created this burger when he was at Harvard, and it soon became very popular among various Ivy league schools.',
      //     type:'main'}]
      cart : rows
    }
     res.json(templateVars);
  })
});






app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
