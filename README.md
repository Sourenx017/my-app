
# Seiko Watch Store App

This is a mobile application built using React Native and Expo for browsing and purchasing Seiko watches.

## Features

- **Product Catalog:** Browse a selection of Seiko watches with details.
- **Shopping Cart:** Add and manage items in a shopping cart.
- **User Authentication:** Simple login, signup and welcome flows.
- **Settings:** Adjust app settings.
- **Responsive Layout:** Designed for a good experience on various screen sizes.
- **Product Details:** View more information about specific products, including images and descriptions.
- **Bottom Navigation:** Easily navigate between the home product list and shopping cart screens.
- **State Management:** Cart state managed with React's Context API.
- **Drawer Navigation**: Includes a drawer navigation for profile and settings.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **Expo:** A toolchain for building and deploying React Native apps.
- **React Navigation:** A library for handling navigation in React Native apps.
- **React Context API:** A method for managing state in React applications (used for the cart).
- **Expo Vector Icons:**  A library providing customizable icons.
- **Montserrat Font:** Used for app fonts.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your_repo_url>
    cd my-app
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the application:**

    ```bash
    npm start
    ```
    This will start the Expo development server. You can then run the app on your mobile device using the Expo Go app or an emulator/simulator.

## How to Use

1.  **Welcome Screen:** The app initially displays a welcome screen before navigating to the main screens.
2.  **Product Listing:** The "Home" screen displays a list of Seiko watches.
3.  **Product Details:** Tap a product to see its details and add it to your cart.
4.  **Shopping Cart:** Use the bottom navigation to go to the cart screen, where you can adjust quantities and remove items.
5.  **Checkout:** (Note: checkout functionality is simulated for demonstration purposes).
6. **User Authentication:** Use the navigation to move into Welcome, Login, or Signup screens for authentication
7.  **Settings:** Access settings via the navigation drawer on the home screen to adjust preferences.