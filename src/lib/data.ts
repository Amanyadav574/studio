
import type { Product, User, Order } from '@/lib/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Organic Apples',
    price: 3.99,
    description: 'Crisp, juicy, and certified organic Gala apples. Perfect for snacking or baking. Sourced from local orchards.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'apples fruit',
  },
  {
    id: 2,
    name: 'Sourdough Bread',
    price: 5.49,
    description: 'Artisanal sourdough loaf with a chewy crust and soft interior. Baked fresh daily. Contains wheat and gluten.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'sourdough bread',
  },
  {
    id: 3,
    name: 'Free-Range Eggs',
    price: 4.99,
    description: 'One dozen large brown eggs from free-range chickens. Rich yolks and excellent for all your cooking needs.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'eggs breakfast',
  },
  {
    id: 4,
    name: 'Whole Milk',
    price: 2.79,
    description: 'Gallon of fresh whole milk, pasteurized and vitamin D fortified. Great for cereals, coffee, or just a cold glass.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'milk dairy',
  },
  {
    id: 5,
    name: 'Avocado',
    price: 1.99,
    description: 'Single large Hass avocado. Creamy, delicious, and packed with healthy fats. Ready to be made into guacamole or sliced on toast.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'avocado fruit',
  },
  {
    id: 6,
    name: 'Cheddar Cheese',
    price: 6.29,
    description: '8oz block of sharp cheddar cheese. Aged for 9 months for a rich, tangy flavor. Perfect for sandwiches or a cheese board.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'cheddar cheese',
  },
  {
    id: 7,
    name: 'Baby Carrots',
    price: 2.49,
    description: '1lb bag of peeled baby carrots. A convenient and healthy snack for all ages. Great for dipping.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'carrots vegetable',
  },
  {
    id: 8,
    name: 'Greek Yogurt',
    price: 3.89,
    description: '32oz container of plain Greek yogurt. Thick, creamy, and high in protein. An excellent base for breakfast bowls.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'yogurt dairy',
  },
  {
    id: 9,
    name: 'Organic Bananas',
    price: 1.29,
    description: 'A bunch of ripe, organic bananas. Naturally sweet and full of potassium.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'bananas fruit',
  },
  {
    id: 10,
    name: 'Almond Milk',
    price: 3.49,
    description: 'Half-gallon of unsweetened almond milk. A great dairy-free alternative.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'almond milk',
  },
  {
    id: 11,
    name: 'Dark Chocolate Bar',
    price: 2.99,
    description: '70% cacao dark chocolate bar. Rich and intense flavor.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'dark chocolate',
  },
  {
    id: 12,
    name: 'Ground Coffee',
    price: 12.99,
    description: '12oz bag of medium-roast ground coffee. Ethically sourced Arabica beans.',
    image: 'https://placehold.co/600x600.png',
    dataAiHint: 'coffee beans',
  },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'admin',
  },
  {
    id: 2,
    name: 'User',
    email: 'user@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'user',
  },
   {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password',
    role: 'user',
  },
  {
    id: 4,
    name: 'Bob Williams',
    email: 'bob@example.com',
    password: 'password',
    role: 'user',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password',
    role: 'user',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'password',
    role: 'user',
  },
  {
    id: 7,
    name: 'Evan Davis',
    email: 'evan@example.com',
    password: 'password',
    role: 'user',
  }
];

export let orders: Order[] = [
    {
      id: "ORD001",
      customerName: "Alice Johnson",
      date: new Date("2024-05-20T10:30:00Z"),
      total: 13.97,
      status: "Delivered",
      items: [
        { ...products[0], quantity: 1 },
        { ...products[1], quantity: 1 },
        { ...products[2], quantity: 1 },
      ],
    },
    {
      id: "ORD002",
      customerName: "Bob Williams",
      date: new Date("2024-05-21T14:00:00Z"),
      total: 8.28,
      status: "Pending",
      items: [
        { ...products[1], quantity: 1 },
        { ...products[3], quantity: 1 },
      ],
    },
    {
      id: "ORD003",
      customerName: "Charlie Brown",
      date: new Date("2024-04-15T09:12:00Z"),
      total: 7.78,
      status: "Delivered",
      items: [{...products[7], quantity: 2}],
    },
    {
      id: "ORD004",
      customerName: "Alice Johnson",
      date: new Date("2024-04-28T18:45:00Z"),
      total: 17.27,
      status: "Delivered",
      items: [
        { ...products[1], quantity: 2 },
        { ...products[5], quantity: 1 },
      ],
    },
     {
      id: "ORD005",
      customerName: "User",
      date: new Date("2024-05-22T11:00:00Z"),
      total: 19.26,
      status: "Pending",
      items: [
        { ...products[0], quantity: 1 },
        { ...products[4], quantity: 2 },
        { ...products[8], quantity: 1 },
        { ...products[10], quantity: 3 },
       ],
    },
    {
      id: "ORD006",
      customerName: "Bob Williams",
      date: new Date("2024-03-10T11:00:00Z"),
      total: 8.78,
      status: "Delivered",
      items: [
        { ...products[5], quantity: 1 },
        { ...products[6], quantity: 1 },
      ],
    },
    {
      id: "ORD007",
      customerName: "Diana Prince",
      date: new Date("2024-05-18T12:30:00Z"),
      total: 21.46,
      status: "Delivered",
      items: [
        { ...products[11], quantity: 1 },
        { ...products[3], quantity: 1 },
        { ...products[9], quantity: 1 },
      ],
    },
    {
      id: "ORD008",
      customerName: "Evan Davis",
      date: new Date("2024-05-19T08:20:00Z"),
      total: 10.26,
      status: "Pending",
      items: [
        { ...products[1], quantity: 1 },
        { ...products[4], quantity: 2 },
      ],
    },
    {
      id: "ORD009",
      customerName: "Alice Johnson",
      date: new Date("2024-03-05T16:50:00Z"),
      total: 4.28,
      status: "Delivered",
      items: [
        { ...products[8], quantity: 1 },
        { ...products[10], quantity: 1 },
      ],
    },
    {
      id: "ORD010",
      customerName: "Charlie Brown",
      date: new Date("2024-02-20T13:00:00Z"),
      total: 16.48,
      status: "Delivered",
      items: [
          { ...products[11], quantity: 1 },
          { ...products[9], quantity: 1 },
      ]
    },
    {
      id: "ORD011",
      customerName: "Diana Prince",
      date: new Date("2024-05-01T09:00:00Z"),
      total: 15.96,
      status: "Delivered",
      items: [
        { ...products[0], quantity: 4 },
      ]
    },
    {
      id: "ORD012",
      customerName: "Bob Williams",
      date: new Date("2024-05-15T18:00:00Z"),
      total: 4.98,
      status: "Pending",
      items: [
        { ...products[2], quantity: 1 },
      ]
    },
     {
      id: "ORD013",
      customerName: "Evan Davis",
      date: new Date("2024-02-11T10:10:00Z"),
      total: 14.76,
      status: "Delivered",
      items: [
        { ...products[6], quantity: 2 },
        { ...products[7], quantity: 2 },
      ]
    },
     {
      id: "ORD014",
      customerName: "User",
      date: new Date("2024-01-29T19:25:00Z"),
      total: 21.25,
      status: "Delivered",
      items: [
        { ...products[1], quantity: 1 },
        { ...products[11], quantity: 1 },
        { ...products[8], quantity: 1 },
      ]
    },
];

// Function to add a new order
export const addOrder = (newOrder: Omit<Order, 'id' | 'date'>) => {
  const orderWithDetails: Order = {
    ...newOrder,
    id: `ORD${(orders.length + 1).toString().padStart(3, '0')}`,
    date: new Date(),
  };
  orders.unshift(orderWithDetails);
  return orderWithDetails;
};
