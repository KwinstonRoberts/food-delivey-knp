
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
        // Inserts seed entries
        knex('dishes').insert({
          id: 1,
          name: 'Bilionaire Burger',
          pic: '/images/burger2.jpg',
          price:10000.00,
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, atque deleniti facilis'
        })
      ]);
    };
