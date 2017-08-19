
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

    return Promise.all([
        knex('order').del();
  ]);
};
