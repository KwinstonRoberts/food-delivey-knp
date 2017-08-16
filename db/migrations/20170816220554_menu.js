exports.up = function(knex, Promise) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments();
    table.string('name');
    table.string('pic');
    table.float('price');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
