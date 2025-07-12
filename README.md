# Seiko Watch Store App

This is a mobile application built using React Native and Expo for browsing and purchasing Seiko watches.

## Features

### User Features

- **Product Catalog:** Browse a selection of Seiko watches with details.
- **Shopping Cart:** Add and manage items in a shopping cart.
- **User Authentication:** Secure login and signup with JWT.
- **Profile Management:** View and edit user profile information.
- **Order History:** Track past purchases and order status.
- **Responsive Layout:** Optimized for various screen sizes.

### Admin Features

- **Product Management:** Add, edit, and delete products from the catalog.
- **Order Management:** View and manage all customer orders.
- **User Management:** View and manage user accounts.
- **Role-based Access:** Separate interfaces for admin and regular users.

### Technical Features

- **RESTful API:** Backend built with NestJS and MongoDB.
- **JWT Authentication:** Secure token-based authentication.
- **State Management:** Context API for managing application state.
- **Persistent Storage:** Local storage for cart and authentication.
- **Bottom Navigation:** Intuitive navigation between main features.
- **Form Validation:** Client-side validation for all forms.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **Expo:** A toolchain for building and deploying React Native apps.
- **React Navigation:** A library for handling navigation in React Native apps.
- **React Context API:** A method for managing state in React applications (used for the cart).
- **Expo Vector Icons:** A library providing customizable icons.
- **Montserrat Font:** Used for app fonts.

## Installation

### Backend Setup

1. **Clone the repository with submodules:**

   ```bash
   git clone --recursive https://github.com/Sourenx017/my-app.git
   cd my-app
   ```

2. **If you already cloned the repository without submodules:**

   ```bash
   git submodule add https://github.com/Sourenx017/NESTJ_DATABASE.git backend
   # Or if the submodule is already configured:
   git submodule init
   git submodule update
   ```

3. **Setup the backend:**

   ```bash
   cd backend
   npm install
   ```

4. **Create a .env file in the backend directory with the following content:**

   ```env
   PORT=3002
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the backend server:**

   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **In a new terminal, go back to the root directory:**

   ```bash
   cd ..
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Configure the backend URL:**

   Open `services/axiosConfig.js` and update the `API_BASE_URL` with your local IP address:

   ```javascript
   const API_BASE_URL = __DEV__
     ? "http://YOUR_LOCAL_IP:3002/api"
     : "https://your-production-api.com/api";
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

   This will start the Expo development server. You can then run the app on your mobile device using the Expo Go app or an emulator/simulator.

### Default Admin Account

During development, you can use these credentials to access admin features:

- Email: `admin@example.com`
- Password: `admin123`

Or create a new account and update its privilege to "admin" in the MongoDB database.

## How to Use

1. **Welcome Screen:** The app initially displays a welcome screen before navigating to the main screens.
2. **Product Listing:** The "Home" screen displays a list of Seiko watches.
3. **Product Details:** Tap a product to see its details and add it to your cart.
4. **Shopping Cart:** Use the bottom navigation to go to the cart screen, where you can adjust quantities and remove items.
5. **Checkout:** (Note: checkout functionality is simulated for demonstration purposes).
6. **User Authentication:** Use the navigation to move into Welcome, Login, or Signup screens for authentication.
7. **Settings:** Access settings via the navigation drawer on the home screen to adjust preferences.
