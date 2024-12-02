# E-commerce API

A backend REST API application based on the MERN stack (MongoDB, Express.js, Node.js) to implement various features for an e-commerce platform.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Deployment](#deployment)
- [Installation](#installation)
- [Usage](#usage)
- [Authorization/Authentication](#authorization/authentication)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

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

## Deployment
*The E-commerce API is deployed on Render.com.*

[Render Deployment Link](https://render.com)

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

## Authorization/Authentication
To access protected routes, include the JWT token in the request header with the key `Authorization` and the value `Bearer <jwt token>`.

Example:
```Authorization: Bearer <jwt token>```


## API Endpoints

### User Endpoints
* `/api/user/signup`: POST - Create a new user
* `/api/user/signin`: POST - Login a user
* `/api/user/reset`: PUT - Reset user password *(requires JWT authentication)*

### Product Endpoints *(requires JWT authentication)*
* `/api/products`: GET - Get all products
* `/api/products`: POST - Add a new product
* `/api/products/filter`: GET - Filter products by price, category, and size
* `/api/products/avg`: GET - Get average product price
* `/api/products/:id`: GET - Get a product by ID
* `/api/products/:id`: DELETE - Delete a product by ID
* `/api/products/rate`: POST - Rate a product

### Cart Endpoints *(requires JWT authentication)*
* `/api/cart`: GET - Get cart items
* `/api/cart`: POST - Add item to cart
* `/api/cart`: DELETE - Remove item from cart
* `/api/cart/checkout`: GET - Get the bill for the cart *(requires replica set enabled in mongodb)*

### Order Endpoints *(requires JWT authentication)*
* `/api/orders`: GET - Get orders
* `/api/orders`: POST - Place an order

### Like Endpoints *(requires JWT authentication)*
* `/api/likes`: POST - Like an item
* `/api/likes`: GET - Get likes

### Documentation
* `/api/docs`: GET - Access API documentation using Swagger UI


## Configuration
* `mongooseConfig.js` - Configures Mongoose for MongoDB operations.
* `applicationError.middleware.js` - Handles application errors, unwanted or unrecognized requests, and unknown/wrong routes errors.
* `jwtAuth.middleware.js` - Middleware for JWT authentication and authorization.
* `logger.middleware.js` - Creates error logs which users may face and saves them for developer review.


### Dependencies
* **For hashing passwords**: `bcrypt`
* **For parsing request bodies**: `body-parser`
* **For enabling Cross-Origin Resource Sharing**: `cors`
* **For loading environment variables**: `dotenv`
* **Web framework for Node.js**: `express`
* **For JWT authentication**: `jsonwebtoken`
* **MongoDB driver for Node.js**: `mongodb`
* **MongoDB object modeling tool**: `mongoose`
* **For handling file uploads**: `multer`
* **For working with file and directory paths**: `path`
* **For serving Swagger UI**: `swagger-ui-express`
* **For logging**: `winston`


### Contributing
* *Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.*
