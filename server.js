"use strict";


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

app.post('/sms', function(req, res) {
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  var twiml = new MessagingResponse();
  if(req.body.Body.toLowerCase() === 'confirm'){
    twiml.message('Thanks, your order is now being processed');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    console.log(req.body.from);
    knex('order')
      .where('phone', '=', req.body.from)
      .update({
        status: 'comfirmed',
      }).ascallback((err)=>{
        knex.select('*').from('order').asCallback((err,rows)=>{
          console.log(rows);
        });
      res.end(twiml.toString());
    });
  }else if(req.body.Body.toLowerCase()==='decline'){
    twiml.message('Your order has been cancelled');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    knex('order')
      .where('phone', '=', req.body.from)
      .del();
    res.end(twiml.toString());
  }
});

app.post("/order", (req, res) => {
    client.messages.create({
    to: process.env.VERIFIED_NUMBER,
    from: process.env.TWILIO_NUMBER,
    body: `Your order has been placed ${req.body.name}:${req.body.receipt}\n
    text "confirm" to start the order or text "cancel" to undo`,
  }).then((message) => {
      knex('order').insert({
        name: req.body.name,
        email: 'example@example.com',
        phone: process.env.VERIFIED_NUMBER,
        receipt: req.body.receipt,
        status: 'ordered'

      })
      res.send(console.log(message.sid));
    });
  });

var receipt =function(){ app.post('/receipt', (req, res) => {
  const VoiceResponse = require('twilio').twiml.VoiceResponse;
  const twiml = new VoiceResponse();
  twiml.say('Kyle has placed an order');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());

})};

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
        dish:{},
        addons:{}
      }
      knex.select('*').from('dishes').where('name','Billionaire Burger').asCallback((err,row)=>{
         if (err) return console.error(err);
           templateVars.dish = row;
          knex.select('name','price','pic').from('dishes').where('type','sides').asCallback((err,sides)=>{
            templateVars.addons = sides;
            console.log(templateVars);
            res.render('index',templateVars)
          });
    });
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
      cart : rows
    }
     res.json(templateVars);
  })
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
