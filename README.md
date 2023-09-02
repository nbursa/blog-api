# Blog API

This application provides a backend for managing blog posts and user authentication. It utilizes the Nest.js framework and MongoDB for data storage.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the Blog API, follow the instructions below to set up the project on your local machine.

## Features

- User Registration and Login: Users can register an account and log in to the application.
- Create, Read, Update, Delete (CRUD) Blog Posts: Authenticated users can manage blog posts.
- JWT Authentication: Secure authentication and authorization using JSON Web Tokens.
- Data Storage: Utilizes MongoDB and Mongoose for efficient data storage and retrieval.
- Extensible: Built with Nest.js, allowing easy extension and integration of additional features.

## Technologies Used

- [Nest.js](https://nestjs.com/): A powerful Node.js framework for building scalable applications.
- [MongoDB](https://www.mongodb.com/): A NoSQL database used for storing blog post and user data.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library for hashing passwords.
- [Passport](http://www.passportjs.org/): Authentication middleware for Node.js.
- [JWT](https://jwt.io/): JSON Web Tokens for secure authentication and authorization.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript for enhanced code quality.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory using your command line or terminal.
3. Install project dependencies:

   ```
   npm install
   ```

## Usage

1. Set up the environment variables:
    - Create a `.env` file in the root directory.
    - Add the necessary environment variables, such as database connection details and JWT secret key.

2. Start the development server:
   ```
   npm run dev
   ```

3. The API will be accessible at `http://localhost:3000`.

## Testing

Run tests using the following commands:

- Run all tests:
  ```
  npm test
  ```

- Run tests with coverage:
  ```
  npm run test:cov
  ```

## Contributing

Contributions are welcome! If you'd like to contribute to the Blog API, please follow the steps mentioned in the [Contributing](#contributing) section of this README.

## License

This project is licensed under the [UNLICENSED License](LICENSE).

---
