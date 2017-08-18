
exports.up = function(knex, Promise) {
  return Promise.all([
     knex.schema.createTable('dishes', function (table) {
       table.increments('id');
       table.string('name');
       table.string('pic');
       table.string('description');
       table.float('price');
       table.string('type');
     })
   ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
