
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    knex('order').truncate();
    return Promise.all([
  ]);
};
