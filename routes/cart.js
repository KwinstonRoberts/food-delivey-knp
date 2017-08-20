"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    if (!req.body.name) return console.error('param does not exist');
    knex('menu_cart').insert({
      cart_id: knex.select('id').from('cart').where('owner', 'Kyle'),
      menu_id: knex.select('id').from('dishes').where('name', req.body.name),
      quantity: req.body.quantity
    }).asCallback((err) => {
      if (err) return console.error(err);
      knex.countDistinct("menu_id").from('menu_cart').where('cart_id', knex.select('id').from('cart').where('owner', 'Kyle')).asCallback((err, row) => {
        if (err) return console.error(err);
        res.json({
          items: row[0]
        });
      });
    });
  });
  router.get("/", (req, res) => {
    knex('dishes')
      .leftJoin('menu_cart', 'dishes.id', 'menu_cart.menu_id')
      .leftJoin('cart', 'menu_cart.cart_id', 'cart.id')
      .select('name', 'price', 'menu_cart.quantity as quantity').distinct()
      .whereNotNull('quantity')
      .asCallback((err, rows) => {
        console.log(rows)
        let templateVars = {
          cart: rows
        }
        res.json(templateVars);
      })
  });
  return router;
};
