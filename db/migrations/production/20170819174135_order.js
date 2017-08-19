
exports.up = function(knex, Promise) {
  return promise.all([
     knex.schema.table('order', function (table) {
       table.string('status');
     })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order', function (table) {
    table.dropColumn('status');
  });
};
