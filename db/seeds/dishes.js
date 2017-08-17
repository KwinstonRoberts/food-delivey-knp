exports.seed = function(knex, Promise) {
  return knex('dishes').truncate().then(function(){
    return Promise.all([
        // Inserts seed entries
        knex('dishes').insert({
          name: 'Face Burger',
          pic: '/images/faceBurger.jpg',
          price:17.00,
          description:' Face Burger is our signiture dish. Mark created this burger when he was at Harvard, and it soon became very popular among various Ivy league schools.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Billionaire Burger',
          pic: '/images/billionaireBurger.jpg',
          price:100.00,
          description:'With truffles and caviar The Billionaire Burger is the epitomy of lavish indulgence. Eating this burger will have you feeling like a jet owning billionaire.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Humble Burger',
          pic: '/images/humbleBurger.jpg',
          price:21.00,
          description:'After being humbled by Elon Musk, the CEO of Tesla and SpaceX, Mark learned a valuable lesson and created the Humble burger. These succulent sliders signify the shrinkage of his ego.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Farmville Vegan Burger',
          pic: '/images/farmville.jpg',
          price:20.00,
          description:'The Farmville Vegan Burger will make even the most voracious meat-eater consider going Vegan.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Poke Burger',
          pic: '/images/pokeBurger.jpg',
          price:21.00,
          description:'The Poke Burger features an extra large patty, double cheese and jumbo shrimp.',
          type:'main'
        }),
        knex('dishes').insert({
          name: 'Harvard Fries',
          pic: '/images/fries.jpg',
          price:7.00,
          description:'Made with fresh potatoes from P.E.I Canada, Harvard Fries are  double fried in 100% olive oil. The Harvard Fries are not salty like Stanford fries nor like to surf',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Ivy League Rings',
          pic: '/images/onionRings.jpeg',
          price:8.00,
          description:'This king of onion rings, made with freshly prepared onions, put all others to shame, demand them to bend a knee, pledge fieldty, then ask to kiss the batter of Ivy League rings.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Elon Yam Frites',
          pic: '/images/yamfries.jpg',
          price:9.00,
          description:'Out of respect to Elon Musk, who has educated Mark on A.I, these yam fries are sweet but low on the glycemic index, providing you the taste of sweet treats with the benefit of low sugar.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Social Salad',
          pic: '/images/salad.jpg',
          price:9.00,
          description:'Eating salad is not a lonely pursuit anymore! The social salad is not only fresh, healthy and tasty but also photogenic enough to share with your friends on social media.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Silicon Poutine',
          pic: '/images/poutine.jpg',
          price:11.00,
          description:'Traditional poutine meets the creativity and the scale of Silicon Valley! The Silicon Poutine uses only the heaviest cheese and gravy for the hungry minds, like bootcamp students! Poutine is garnished with green onion and bacon.',
          type:'sides'
        }),
        knex('dishes').insert({
          name: 'Soft Drinks',
          pic: '/images/drinks.png',
          price:3.00,
          description:'Drinks with lot of sugar!',
          type:'drinks'
        }),
        knex('dishes').insert({
          name: 'Nerd Chic Smoothie',
          pic: '/images/smoothies.jpg',
          price:9.00,
          description:'A Smoothie for both nerds and chic people, and everyone else in between! The smoothie has yogurt, fruits, hemp protein, and kale!',
          type:'drinks'
        }),
        knex('dishes').insert({
          name: 'Perrierrier',
          pic: '/images/Perrier.jpg',
          price:8.00,
          description:'The best carbonated water in town!',
          type:'drinks'
        })
      ]);
  });
};
