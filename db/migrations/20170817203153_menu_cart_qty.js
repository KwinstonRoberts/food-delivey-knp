
exports.up = function(knex, Promise) {
   return knex.schema.table('menu_cart', function (table) {
      table.integer('quantity');
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('quantity');
};
