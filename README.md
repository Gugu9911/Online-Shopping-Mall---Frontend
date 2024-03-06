# Welcome to GroceryHub 🛒✨

Dive into the code repository for GroceryHub, where convenience meets variety in online grocery shopping. Developed using the robust trio of React, TypeScript, and Redux Toolkit, this platform is engineered to deliver a top-notch, intuitive shopping experience.

## Deployment
GroceryHub is proudly hosted on Vercel, showcasing our deployment capabilities: [Visit GroceryHub](https://e-commerce-website-five-delta.vercel.app/).

## Features 🌟
1. **TypeScript & Redux Toolkit**: Empowering developers with type safety and efficient state management, the project is a paradigm of modern web development practices.
2. **API Integration**: Leveraging the `https://fakeapi.platzi.com/` API for a responsive, real-time product catalog.
3. **Responsive Layout**: A flexible and adaptive design ensures a flawless shopping experience across all devices.
4. **Redux Store Management**:
   - **Product Reducer**: Fetch, filter, sort, and perform CRUD operations on products with administrative privileges.
   - **User Reducer**: Smooth registration and login workflow.
   - **Cart Reducer**: Add to cart, modify item quantities, and remove items with ease.
5. **Extra Features**: Dark/light mode toggle and pagination for products.

## Technical Details 🛠️
1. **Components**: A collection of reusable UI elements, including a dynamic Header and Footer.
2. **Pages**: Dedicated pages for the complete product range, individual product details, user profile management, and the shopping cart.
3. **Redux Structure**: Slices designated for handling states of products, user data, and cart actions.
4. **Types**: Strongly typed models and interfaces bring clarity and enforce integrity throughout the app.

## Usage 📋
GroceryHub offers a seamless shopping journey, from browsing to checkout:
1. **Explore Collections**: Start by exploring a diverse range of grocery categories. With a simple click, navigate through well-organized aisles filled with everything from staple pantry items to exotic ingredients.
2. **Detailed Product Insights**: Each product on GroceryHub comes with a detailed page that includes high-resolution images, comprehensive descriptions, nutritional information, and price. Get to know the groceries before buying!
3. **Smart Search & Filter**: Looking for something specific? Use the intelligent search bar to find exactly what's needed. Also, filter products by category, price, and brand to narrow down the search.
4. **Interactive Shopping Cart**: As shoppers proceed, they can add items to the cart with a single click. View the cart at any time to adjust quantities, remove items, or save them for later.

## Testing 🔍
At GroceryHub, the importance of testing to ensure the reliability and robustness of applications is taken seriously. Initially, the concept of unit testing was to verify the seamless operation of the state management logic, with the aim of using Jest and React testing libraries, supplemented by a Mock Service Worker (msw) to simulate server responses for products, shopping carts, and user interactions.

Although many tests have been successfully carried out and completed, sometimes compatibility issues with Axios are encountered, which brings challenges to the execution of the test strategy as planned. This issue prompted a re-examination of testing methods and exploration of alternatives that integrate seamlessly with Axios to ensure that the test suite accurately reflects user interactions and data management within the website.

During this time, all features have been thoroughly manually tested to maintain the commitment to quality and performance.

## License
This project is open-source, available for collaboration under the MIT License.

## Contact
Have feedback or questions? Please initiate a discussion through GitHub issues or contact the project maintainer.

