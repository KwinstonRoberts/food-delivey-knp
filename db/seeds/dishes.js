
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
        // Inserts seed entries
        knex('dishes').insert({
          name: 'Face Burger',
          pic: '/images/burger2.jpg',
          price:10.00,
          description:'Lorem ipsum dolor sit amet,adipisicing elit. Sint facilis, quas rem dignissimos error non inventore cupiditate odio maxime saepe eos ea!'
          type:'main'
        })
      ]);
    };
