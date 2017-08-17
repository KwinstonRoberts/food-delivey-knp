
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', function (table) {
    table.increments('id');
    table.string('owner');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart');
};
