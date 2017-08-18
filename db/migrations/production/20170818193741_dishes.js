
exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_cart', function (table) {
     table.increments('id');
     table.string('name');
     table.string('pic').
     table.float('price');
     table.string('type');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
