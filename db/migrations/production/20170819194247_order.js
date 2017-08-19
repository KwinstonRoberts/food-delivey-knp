
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('order', function (table) {
      table.dropColumn('email');
    }),
     knex.schema.table('order', function (table) {
       table.string('email');
     })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order', function (table) {
    table.dropColumn('email');
  });
};
