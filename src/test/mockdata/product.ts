import { Product } from '../../types/Product';

export const mockProducts: Product[] = [
    {
        id: 4,
        title: "Smart Home Speaker",
        price: 199,
        description:
            "Revolutionize your home with our Smart Home Speaker. Voice-controlled and AI-powered, it can play music, control smart home devices, and assist with everyday tasks. Sleek design to fit any interior.",
        images: [
            "https://i.imgur.com/smartSpeaker1.jpg",
            "https://i.imgur.com/smartSpeaker2.jpg",
            "https://i.imgur.com/smartSpeaker3.jpg",
        ],
        creationAt: "2024-03-01T10:00:00.000Z",
        updatedAt: "2024-03-02T11:00:00.000Z",
        category: {
            id: 6,
            name: "Electronics",
            image: "https://i.imgur.com/electronicsCat.jpg",
            creationAt: "2024-03-01T10:00:00.000Z",
            updatedAt: "2024-03-02T11:00:00.000Z",
        },
    },
    {
        id: 5,
        title: "Eco-Friendly Yoga Mat",
        price: 50,
        description:
            "Find your zen with our Eco-Friendly Yoga Mat. Made with sustainable materials, it provides the perfect balance of comfort and support for your practice. Lightweight and durable for yoga anywhere.",
        images: [
            "https://i.imgur.com/yogaMat1.jpg",
            "https://i.imgur.com/yogaMat2.jpg",
            "https://i.imgur.com/yogaMat3.jpg",
        ],
        creationAt: "2024-03-03T09:00:00.000Z",
        updatedAt: "2024-03-04T10:00:00.000Z",
        category: {
            id: 7,
            name: "Sports & Fitness",
            image: "https://i.imgur.com/sportsCat.jpg",
            creationAt: "2024-03-03T09:00:00.000Z",
            updatedAt: "2024-03-04T10:00:00.000Z",
        },
    },
    {
        id: 6,
        title: "Luxury Silk Pillowcase",
        price: 75,
        description:
            "Upgrade your sleep experience with our Luxury Silk Pillowcase. Made from 100% pure mulberry silk, it's gentle on your skin and hair, preventing wrinkles and split ends. Wake up feeling refreshed and pampered.",
        images: [
            "https://i.imgur.com/silkPillowcase1.jpg",
            "https://i.imgur.com/silkPillowcase2.jpg",
            "https://i.imgur.com/silkPillowcase3.jpg",
        ],
        creationAt: "2024-03-05T12:00:00.000Z",
        updatedAt: "2024-03-06T13:00:00.000Z",
        category: {
            id: 8,
            name: "Home Decor",
            image: "https://i.imgur.com/homeDecorCat.jpg",
            creationAt: "2024-03-05T12:00:00.000Z",
            updatedAt: "2024-03-06T13:00:00.000Z",
        },
    }
];