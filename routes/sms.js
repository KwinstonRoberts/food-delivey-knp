"use strict";

const express = require('express');
const router = express.Router();

module.exports = (sms) => {

  app.post('/', function(req, res) {
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
  app.post("/", (req, res) => {
    message(myNumber, twiNumber, `Your order has been placed ${req.body.name}: ${req.body.receipt} text "confirm" to start the order or text "2" to undo`, function() {
      knex('order').insert({
        name: req.body.name || 'kyle',
        phone: twiNumber,
        receipt: req.body.receipt,
        status: 'ordered'
      }).asCallback((err, row) => {
        if (err) console.error(err);
        res.end('Done');
      });
    });
  });
  return router;
}
