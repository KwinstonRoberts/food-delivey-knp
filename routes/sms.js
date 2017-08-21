"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

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
    }).then((message) => {
      console.log(message.sid)
      callback();
    });
  }

  router.post('/', function(req, res) {
    knex('order').select('status').where('phone', '=', req.body.From).asCallback((err, row) => {
      if (err) console.error(err);
      var status = row[0].status;
      if (status === 'ordered') {
        if (req.body.Body.toLowerCase() === 'confirm') {
          knex('order')
            .where('phone', '=', req.body.From)
            .update({
              status: 'confirmed',
            }).asCallback((err) => {
            if (err) console.error(err);
            respond('Thanks, your order is now being processed\ntext "receipt" to review the order', function() {
              knex.select('receipt').from('order')
                .where('phone', '=', req.body.From)
                .asCallback((err, row) => {
                  if (err) console.error(err);
                  message(myNumber, twiNumber, `${req.body.From} Has ordered these items:${row[0].receipt} text "ready" when the order has been completed, and "end" once you have received payment`, null);
                });
            });
          });
        } else if (req.body.Body.toLowerCase() === '2') {
          respond('Your order has been cancelled', function() {
            ;
            knex('order').where('phone', '=', req.body.From).del();
          });
        }
      } else if (status === 'confirmed') {
        if (req.body.Body.toLowerCase() === 'receipt') {
          knex('order').select('receipt').where('phone', '=', req.body.From).asCallback((err, row) => {
            if (err) console.error(err);
            var receipt = row[0].receipt;
            respond(`Here is your current order: ${receipt}`, function() {
              knex('order')
                .where('phone', '=', req.body.From)
                .update({
                  status: 'confirmed',
                }).asCallback((err) => {
                if (err) console.error(err);
              });
            });
          });
        } else if (req.body.Body.toLowerCase() === '2' && status !== 'processed') {
          respond('Your order has been cancelled', function() {
            knex('order')
              .where('phone', '=', req.body.From)
              .del().asCallback((err) => {
              if (err) console.error(err);
            });
          });
        } else if (req.body.Body.toLowerCase() === 'ready') {
          respond('Your food is ready for pickup.', function() {
            knex('order')
              .where('phone', '=', req.body.From)
              .update({
                status: 'ready',
              }).asCallback((err) => {
              if (err) console.error(err);
            });
          });
        } else if (req.body.Body.toLowerCase() === 'done' && status === 'ready') {
          respond('Thanks for ordering at Zuckerburgers!');
          knex('order')
            .where('phone', '=', req.body.From)
            .update({
              status: 'finished',
            }).asCallback((err) => {
            if (err) console.error(err)
          });
        }
      }
    });
  });
  router.post("/order", (req, res) => {
    message(myNumber, twiNumber, `Your order has been placed ${req.body.name}: ${req.body.receipt} text "confirm" to start the order or text "2" to undo`, function() {
      knex('order').insert({
        name: req.body.name || 'kyle',
        phone: myNumber,
        receipt: req.body.receipt,
        status: 'ordered'
      }).asCallback((err, row) => {
        if (err) console.error(err);

      });
    });
  });
  return router;
}
