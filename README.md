# Welcome to GroceryHub 🛒✨

Dive into the code repository for GroceryHub, where convenience meets variety in online grocery shopping. Developed using the robust trio of React, TypeScript, and Redux Toolkit, this platform is engineered to deliver a top-notch, intuitive shopping experience.

## Deployment
GroceryHub is proudly hosted on Vercel, showcasing our deployment capabilities: [Visit GroceryHub](https://e-commerce-website-beige-xi.vercel.app/).

## Features 🌟
1. **TypeScript & Redux Toolkit**: Empowering developers with type safety and efficient state management, our project is a paradigm of modern web development practices.
2. **API Integration**: Leveraging the `https://fakeapi.platzi.com/` API for a responsive, real-time product catalog.
3. **Responsive Layout**: A flexible and adaptive design ensures a flawless shopping experience across all devices.
4. **Redux Store Management**:
   1. **Product Reducer**: Fetch, filter, sort, and perform CRUD operations on products with administrative privileges.
   2. **User Reducer**: Smooth registration and login workflow.
   3. **Cart Reducer**: Add to cart, modify item quantities, and remove items with ease.
5. **Extra Features**: Dark/light mode toggle, pagination for products, and optimizations for peak performance.

## Technical Details 🛠️
1. **Components**: A collection of reusable UI elements, including a dynamic Header and Footer.
2. **Pages**: Dedicated pages for the complete product range, individual product details, user profile management, and the shopping cart.
3. **Redux Structure**: Slices designated for handling states of products, user data, and cart actions.
4. **Types**: Strongly typed models and interfaces bring clarity and enforce integrity throughout the app.

## Usage 📋
GroceryHub offers a seamless shopping journey, from browsing to checkout:
1. **Explore Collections**: Start by exploring our diverse range of grocery categories. With a simple click, you can navigate through our well-organized aisles filled with everything from staple pantry items to exotic ingredients.
2. **Detailed Product Insights**: Each product on GroceryHub comes with a detailed page that includes high-resolution images, comprehensive descriptions, nutritional information, and price. Get to know your groceries before you buy!
3. **Smart Search & Filter**: Looking for something specific? Use our intelligent search bar to find exactly what you need. You can also filter products by category, price, and brand to narrow down your search.
4. **Interactive Shopping Cart**: As you shop, add items to your cart with a single click. View your cart at any time to adjust quantities, remove items, or save them for later.

## Testing 🔍
At GroceryHub, we value the importance of testing to ensure the reliability and robustness of our application. Initially, unit tests were conceptualized to verify the seamless operation of our state management logic, with the intention to use Jest and the React Testing Library, complemented by Mock Service Worker (msw) to simulate server responses for products, cart, and user interactions.
However, during the implementation phase, we encountered compatibility issues with Axios, which led to challenges in executing the testing strategy as planned. This hiccup has prompted our team to revisit the testing approach and explore alternatives that seamlessly integrate with Axios, ensuring that our test suites accurately reflect user interactions and data management within the app.
In the interim, we are conducting thorough manual testing across all functionalities to maintain our commitment to quality and performance. The resolution of this testing challenge is a top priority, and updates will be documented in our project logs.

## License
This project is open-source, available for collaboration under the MIT License.

## Contact
Have feedback or questions? Please initiate a discussion through our GitHub issues or contact the project maintainer.
