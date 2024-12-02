# E-commerce API

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
