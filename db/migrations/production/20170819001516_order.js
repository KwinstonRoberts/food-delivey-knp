
exports.up = function(knex, Promise) {
  return promise.all([
     knex.schema.createTable('order', function (table) {
       table.increments('id');
       table.string('name');
       table.foreign('email');
       table.integer('phone');
       table.text('receipt','longtext');
       table.integer('amount_owing');
     })
  ]);
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('order');
};
