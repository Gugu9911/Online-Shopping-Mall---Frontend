
# GroceryHub Frontend 🛒✨

Welcome to the frontend repository for GroceryHub, your premier online grocery shopping destination. Developed using React, TypeScript, Redux Toolkit, and Material UI, GroceryHub offers a seamless and responsive shopping experience across all devices.

## Quick Links

- **Live Website:** [Visit GroceryHub](https://online-shopping-mall.vercel.app/)
- **API Endpoint:** [GroceryHub API](https://online-shopping-mall-api.onrender.com/)
- **Backend Repository:** [GroceryHub Backend](https://github.com/Gugu9911/Online-Shopping-Mall---API)

## Features 🌟

GroceryHub is designed to enhance the online shopping experience with advanced features and functionalities:

1. **Type Safety and State Management**:
   - Utilizes TypeScript for strong typing and Redux Toolkit for efficient state management.

2. **Responsive Design**:
   - Adapts smoothly to different screen sizes ensuring a flawless shopping experience on any device.

3. **Dynamic Interactions**:
   - Includes a dark/light mode toggle and pagination for product listings.

4. **Advanced Product Management**:
   - Supports comprehensive CRUD operations for products, allowing for creation, reading, updating, and deletion with admin privileges.

5. **User Authentication**:
   - Streamlined registration and login process using custom user reducer actions.

6. **Enhanced Shopping Cart**:
   - Facilitates adding, updating, and removing products, with immediate feedback on the cart state.

## Technical Details 🛠️

### Structure:

- **Components**: Reusable UI components like headers, footers, and buttons.
- **Pages**: Specific pages for product listings, product details, user profiles, and shopping cart management.
- **Redux**: Organized slices for managing states of products, users, order and cart actions.
- **Router**: Utilizes React Router for navigation and routing management.

### Key Technologies:

- **React**: Framework for building the user interface.
- **Redux Toolkit**: For state management across the app.
- **Material UI**: For styling and responsive design elements.
- **TypeScript**: Programming language used for type safety and scalability.


## Usage 📋

### Shopping Journey

- **Explore Products**: Navigate through a diverse range of categories to find everything from daily essentials to exotic ingredients.
- **Product Details**: Access detailed information on each product, including high-resolution images, descriptions, nutritional facts, and prices.
- **Search and Filter**: Use the search bar and filters to easily locate products by name, category, or price.
- **Interactive Cart**: Effortlessly manage your shopping cart; add items, adjust quantities, or save them for later.

### User Interaction

- **Registration and Login**: Users can register for a new account and log in to access personalized features.
- **Profile Management**: Users can view their profile, update personal information, and manage their account settings.
- **Order Management**: Users can create orders from their shopping carts, view their order history, and delete orders if necessary.
- **Category Management**: Admins have the ability to create, retrieve, and delete product categories to organize the inventory effectively.

### Additional Features

- **Theme Switching**: Users can toggle between dark and light themes using the Context API.
- **Pagination**: Implements pagination to manage and display the product listings efficiently, enhancing load times and user experience.
- **Responsive Design**: The site features a responsive layout, ensuring a seamless shopping experience on both desktops and mobile devices.

### Permissions Structure

- **Visitor**: Can browse products, use filters, log in, and create user accounts.
- **Logged-in User**: Beyond visitor capabilities, they can add products to the shopping cart, proceed to checkout, and manage their orders and profiles.
- **Admin**: Has all the privileges of logged-in users, with additional capabilities such as adding, deleting, and modifying products and categories.


## Getting Started

### Prerequisites

Before you begin, ensure you have the following software and tools installed on your system:
-  **Node.js**: Version 16.18.80 or newer.

### Installation

To get started with the project, the first step is to clone the repository to your local machine. Open your terminal and run the following git command:
```bash
git  clone https://github.com/Gugu9911/Online-Shopping-Mall---Frontend.git
```

After cloning the project, navigate to the project directory and install the required dependencies by running:
```bash
npm  install
```

Running the Project
```bash
npm  start
```

## Testing 🔍

- **Jest and msw**: Tools used for running unit tests and mocking service workers to ensure functionality and reliability.
- **Run Tests**:
Running the Tests
```bash
npm test
```

## Collaboration and License

- **Open Source**: This project is open for collaboration under the MIT License.
- **Contribution**: Feel free to fork the repository, submit pull requests, or open issues for discussion.

## Contact

- **Feedback**: For any feedback or questions, please use the GitHub issues or contact the project maintainer directly through GitHub.
