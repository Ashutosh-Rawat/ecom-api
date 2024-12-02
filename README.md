# E-commerce API

// Create a new user
* `/api/user/signup`: POST

// Login a user
* `/api/user/signin`: POST

// Reset user password (requires JWT authentication)
* `/api/user/reset`: PUT
* 
A backend REST API application based on the MERN stack (MongoDB, Express.js, React, Node.js) to implement various features for an e-commerce platform.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The E-commerce API is designed to provide a robust backend for an e-commerce platform. It includes features such as user authentication, product management, order management, cart management, and more. The API is built using the MERN stack and follows RESTful principles.

## Features
- User authentication and authorization
- Product management (CRUD operations)
- Order management
- Cart management
- Payment integration
- Admin dashboard
- Secure and scalable architecture

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ecom-api.git
    cd ecom-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Usage

### Running the Server
To start the server, run:
```bash
npm start
```

The server will start on http://localhost:3100.

API Endpoints
User Routes
POST /api/user/signup: Register a new user

POST /api/user/signin: Login a user

PUT /api/user/reset: Reset user password (requires JWT authentication)

Product Routes
GET /api/products: Get all products

POST /api/products: Create a new product (requires admin authentication)

GET /api/products/filter: Filter products by price, category, and size

GET /api/products/avg: Get the average price of products

GET /api/products/:id: Get a single product by ID

DELETE /api/products/:id: Delete a product by ID

POST /api/products/rate: Rate a product

Cart Routes
GET /api/cart: Get cart items (requires JWT authentication)

POST /api/cart: Add item to cart (requires JWT authentication)

DELETE /api/cart: Remove item from cart (requires JWT authentication)

GET /api/cart/checkout: Get the bill for the cart (requires JWT authentication)

Order Routes
GET /api/orders: Get orders (requires JWT authentication)

POST /api/orders: Place an order (requires JWT authentication)

Like Routes
POST /api/likes: Like an item (requires JWT authentication)

GET /api/likes: Get likes (requires JWT authentication)

Documentation
GET /api/docs: Access API documentation using Swagger UI

Middleware
applicationError.middleware.js: Handles application errors

jwtAuth.middleware.js: JWT authentication middleware

logger.middleware.js: Logging middleware

Configuration
mongooseConfig.js: Mongoose configuration and category initialization

Dependencies
bcrypt: For hashing passwords

body-parser: For parsing request bodies

cors: For enabling Cross-Origin Resource Sharing

dotenv: For loading environment variables

express: Web framework for Node.js

jsonwebtoken: For JWT authentication

mongodb: MongoDB driver for Node.js

mongoose: MongoDB object modeling tool

multer: For handling file uploads

path: For working with file and directory paths

swagger-ui-express: For serving Swagger UI

winston: For logging

Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Deployment on Render.com
To deploy this application on Render.com, follow these steps:

Create a new Web Service on Render.com:

Go to Render.comand create a new Web Service.

Connect your GitHub repository to Render.

Set up environment variables:

In the Render dashboard, go to the Environment tab and add the following environment variables:

env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Build and Start Command:

Set the Build Command to:

bash
npm install
Set the Start Command to:

bash
npm start
Access your application:

Once deployed, your application will be accessible at the URL provided by Render.

markdown
# The server will start on http://localhost:3100.

# API Endpoints
# User Routes
# POST /api/user/signup: Register a new user

# POST /api/user/signin: Login a user

# PUT /api/user/reset: Reset user password (requires JWT authentication)

# Product Routes
# GET /api/products: Get all products

# POST /api/products: Create a new product (requires admin authentication)

# GET /api/products/filter: Filter products by price, category, and size

# GET /api/products/avg: Get the average price of products

# GET /api/products/:id: Get a single product by ID

# DELETE /api/products/:id: Delete a product by ID

# POST /api/products/rate: Rate a product

# Cart Routes
# GET /api/cart: Get cart items (requires JWT authentication)

# POST /api/cart: Add item to cart (requires JWT authentication)

# DELETE /api/cart: Remove item from cart (requires JWT authentication)

# GET /api/cart/checkout: Get the bill for the cart (requires JWT authentication)

# Order Routes
# GET /api/orders: Get orders (requires JWT authentication)

# POST /api/orders: Place an order (requires JWT authentication)

# Like Routes
# POST /api/likes: Like an item (requires JWT authentication)

# GET /api/likes: Get likes (requires JWT authentication)

# Documentation
# GET /api/docs: Access API documentation using Swagger UI

# Middleware
# applicationError.middleware.js: Handles application errors

# jwtAuth.middleware.js: JWT authentication middleware

# logger.middleware.js: Logging middleware

# Configuration
# mongooseConfig.js: Mongoose configuration and category initialization

# Dependencies
# bcrypt: For hashing passwords

# body-parser: For parsing request bodies

# cors: For enabling Cross-Origin Resource Sharing

# dotenv: For loading environment variables

# express: Web framework for Node.js

# jsonwebtoken: For JWT authentication

# mongodb: MongoDB driver for Node.js

# mongoose: MongoDB object modeling tool

# multer: For handling file uploads

# path: For working with file and directory paths

# swagger-ui-express: For serving Swagger UI

# winston: For logging

# Contributing
# Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
