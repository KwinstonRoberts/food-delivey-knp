
exports.up = function(knex, Promise) {
  return knex.schema.table('dishes', function (table) {
    table.string('type');
  });
  knex('dishes').where('name', '=', 'Billionaire Burger').update({type: 'main'})
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes', function (table) {
    table.dropColumn('type');
  });
};
