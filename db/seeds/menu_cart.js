
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu_cart').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu_cart').insert({cart_id: 2, menu_id: 27}),
        knex('menu_cart').insert({cart_id: 2, menu_id: 28}),
      ]);
    });
};
