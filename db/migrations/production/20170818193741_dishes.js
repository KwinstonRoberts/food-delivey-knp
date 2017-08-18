
exports.up = function(knex, Promise) {
  return Promise.all([
     knex.schema.createTable('dishes', function (table) {
       table.increments('id');
       table.string('name');
       table.string('pic').
       table.decimal('price');
       table.string('type');
     });
   ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
