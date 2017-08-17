
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cart').del().then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cart').insert({owner: 'Kyle'}),
      ]);
    });
};
