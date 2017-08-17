
exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_cart', function (table) {
    table.integer('cart_id').unsigned();
    table.foreign('cart_id').references('cart.id');
    table.integer('menu_id').unsigned()
    table.foreign('menu_id').references('dishes.id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_cart');
};
