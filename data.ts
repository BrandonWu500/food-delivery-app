export const featuredItems = [
  {
    id: 0,
    title: 'BURGER',
    img: '/images/featured1.png',
  },
  {
    id: 1,
    title: 'PIZZA',
    img: '/images/featured2.png',
  },
  {
    id: 2,
    title: 'TACOS',
    img: '/images/featured3.png',
  },
];

export const productItems = [
  {
    id: 0,
    title: 'CHEESE',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 19.99,
  },
  {
    id: 1,
    title: 'PEPPERONI',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 19.99,
  },
  {
    id: 2,
    title: 'HAWAIIAN',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 19.99,
  },
  {
    id: 3,
    title: 'BUFFALO',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 22.99,
  },
  {
    id: 4,
    title: 'VEGGIE',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 22.99,
  },
  {
    id: 5,
    title: 'MARGHERITA',
    img: '/images/pizza.png',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias error repellendus aut numquam necessitatibus ducimus.',
    price: 22.99,
  },
];

export const cartItems = [
  {
    id: 0,
    img: '/images/pizza.png',
    name: 'CHEESE',
    extras: ['extra cheese', 'garlic'],
    price: 19.99,
    quantity: 2,
    total: 39.98,
  },
  {
    id: 1,
    img: '/images/pizza.png',
    name: 'BUFFALO',
    extras: ['extra cheese', 'garlic'],
    price: 22.99,
    quantity: 1,
    total: 22.99,
  },
];

export const orderItems = [
  {
    id: 1,
    customer: 'John Doe',
    address: '760 Baker Ave.\nLittle Falls, NJ 07424',
    total: 62.97,
    status: 'paid',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    address: '25 Shady St.\nFairfax, VA 22030',
    total: 42.17,
    status: 'preparing',
  },
  {
    id: 3,
    customer: 'James Bond',
    address: '53 Cedar St.\nSalem, MA 01970',
    total: 32.92,
    status: 'delivered',
  },
];
