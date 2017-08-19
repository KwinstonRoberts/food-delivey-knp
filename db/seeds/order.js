
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    knex('order').del();
    return Promise.all([
  ]);
};
