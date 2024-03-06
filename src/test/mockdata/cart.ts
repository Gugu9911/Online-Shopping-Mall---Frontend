import { CartItem } from "../../types/Cart";

export const CartMock: CartItem[] = [
  {
    id: 2,
    title: "Eco-Friendly Reusable Water Bottle",
    price: 30,
    description:
      "Stay hydrated and environmentally conscious with our Eco-Friendly Reusable Water Bottle. Made from durable, BPA-free materials, it's perfect for your daily adventures. Its leak-proof design and easy-carry handle make it the ultimate companion for any lifestyle.",
    images: [
      "https://i.imgur.com/WaterBottle1.jpg",
      "https://i.imgur.com/WaterBottle2.jpg",
      "https://i.imgur.com/WaterBottle3.jpg",
    ],
    creationAt: "2024-03-01T10:00:00.000Z",
    updatedAt: "2024-03-02T11:00:00.000Z",
    category: {
      id: 7,
      name: "Sports & Fitness",
      image: "https://i.imgur.com/sportsCat.jpg",
      creationAt: "2024-03-01T10:00:00.000Z",
      updatedAt: "2024-03-02T11:00:00.000Z",
    },
    quantity: 2,
  },
  {
    id: 3,
    title: "Smart Fitness Watch",
    price: 199,
    description:
      "Track your fitness goals with our Smart Fitness Watch. It features heart rate monitoring, GPS tracking, and waterproof design, making it your perfect workout companion.",
    images: [
      "https://i.imgur.com/fitnessWatch1.jpg",
      "https://i.imgur.com/fitnessWatch2.jpg",
      "https://i.imgur.com/fitnessWatch3.jpg",
    ],
    creationAt: "2024-03-03T12:00:00.000Z",
    updatedAt: "2024-03-04T13:00:00.000Z",
    category: {
      id: 7,
      name: "Sports & Fitness",
      image: "https://i.imgur.com/sportsCat.jpg",
      creationAt: "2024-03-03T12:00:00.000Z",
      updatedAt: "2024-03-04T13:00:00.000Z",
    },
    quantity: 1,
  },
  {
    id: 4,
    title: "Aromatic Scented Candles Set",
    price: 45,
    description:
      "Create a serene and inviting atmosphere with our Aromatic Scented Candles Set. Featuring a range of calming scents, these candles are made from natural soy wax and essential oils. The perfect way to unwind after a long day.",
    images: [
      "https://i.imgur.com/Candles1.jpg",
      "https://i.imgur.com/Candles2.jpg",
      "https://i.imgur.com/Candles3.jpg",
    ],
    creationAt: "2024-03-05T14:00:00.000Z",
    updatedAt: "2024-03-06T15:00:00.000Z",
    category: {
      id: 8,
      name: "Home Decor",
      image: "https://i.imgur.com/homeDecorCat.jpg",
      creationAt: "2024-03-05T14:00:00.000Z",
      updatedAt: "2024-03-06T15:00:00.000Z",
    },
    quantity: 3,
  }
];
