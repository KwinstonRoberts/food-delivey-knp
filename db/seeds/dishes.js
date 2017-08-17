exports.seed = function(knex, Promise) {
  return knex('dishes').truncate().then(function(){
    return Promise.all([
        // Inserts seed entries
        knex('dishes').insert({
          name: 'Face Burger',
          pic: '/images/burger2.jpg',
          price:17.00,
          description:'Lorem ipsum dolor sit amet,adipisicing elit. Sint facilis, quas rem dignissimos error non inventore cupiditate odio maxime saepe eos ea!',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Billionaire Burger',
          pic: '/images/burger2.jpg',
          price:100.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Humble Burger',
          pic: '/images/burger2.jpg',
          price:21.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Farmville Vegan Burger',
          pic: '/images/burger2.jpg',
          price:20.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Poke Burger',
          pic: '/images/burger2.jpg',
          price:21.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Harvard Fries',
          pic: '/images/burger2.jpg',
          price:7.00,
          description:'Lorem ipsum dolor sit amet,adipisicing elit. Sint facilis, quas rem dignissimos error non inventore cupiditate odio maxime saepe eos ea!',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Ivy League Rings',
          pic: '/images/burger2.jpg',
          price:8.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Elon Yam Frites',
          pic: '/images/burger2.jpg',
          price:9.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Social Salad',
          pic: '/images/burger2.jpg',
          price:9.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Silicon Poutine',
          pic: '/images/burger2.jpg',
          price:11.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Soft Drinks',
          pic: '/images/burger2.jpg',
          price:3.00,
          description:'Lorem ipsum dolor sit amet,adipisicing elit. Sint facilis, quas rem dignissimos error non inventore cupiditate odio maxime saepe eos ea!',
          type:'drinks'
        }),
        knex('dishes').insert({
          name: 'Nerd Chic Smoothie',
          pic: '/images/burger2.jpg',
          price:9.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'drinks'
        }),
        knex('dishes').insert({
          name: 'Perrierrier',
          pic: '/images/burger2.jpg',
          price:8.00,
          description:'Similique modi temporibus, accusantium minus expedita. Ab eos, rem totam ea quaerat aspernatur et id sint, consectetur, libero, aperiam adipisci alias vel.',
          type:'drinks'
        })
      ]);
  });
};
