
exports.up = function(knex, Promise) {
  return Promise.all([
    return knex.schema.table('order', function (table) {
      table.dropColumn('phone');
    });
     knex.schema.table('order', function (table) {
       table.string('phone');
     })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order', function (table) {
    table.dropColumn('phone');
  });
};
