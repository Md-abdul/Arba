Deploy link - https://reliable-lamington-25e17b.netlify.app/


The Online Shop is a full-stack web application that allows users to browse, purchase, and manage products. It provides essential functionalities such as user authentication, product management, and user profile management.

## Functionalities

1. **Signup**: New users can create an account by providing basic information such as username, email, and password.
2. **Login**: Registered users can log in securely to access their accounts and perform various actions within the application.
3. **CRUD Operations**: Users can perform CRUD operations (Create, Read, Update, Delete) on products. They can add new products, view existing ones, update product details, and delete products they own.
4. **Profile Section**: Users have their profile section where they can view and edit their personal information, such as username, email, and profile picture.

## Tech Stack

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web application framework for Node.js, providing a robust set of features for building web and mobile applications.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straight-forward, schema-based solution to model application data.
- **MongoDB**: A NoSQL database that uses a document-oriented data model, storing data in flexible, JSON-like documents.

## Backend API Endpoints

### User Authentication

- **Login**:
  - Method: POST
  - Endpoint: `/user/login`
  - Description: Allows users to log in securely by providing their credentials (email and password).

- **Signup**:
  - Method: POST
  - Endpoint: `/user/signup`
  - Description: Enables new users to create an account by providing necessary information like username, email, and password.

### User Profile

- **Get Single User**:
  - Method: GET
  - Endpoint: `/user/singleusers`
  - Description: Retrieves details of a single user based on their ID or any unique identifier.

- **Update User Profile**:
  - Method: PUT
  - Endpoint: `/user/profile/update`
  - Description: Allows users to update their profile information such as username, email, or profile picture.

### Product Management

- **Get Products**:
  - Method: GET
  - Endpoint: `/product/get`
  - Description: Retrieves a list of products available in the online shop.

- **Add Product**:
  - Method: POST
  - Endpoint: `/product/postproduct`
  - Description: Allows administrators or authorized users to add new products to the shop.
 
- **Update Product**:
  - Method: PUT
  - Endpoint: `/product/update/:id`
  - Description: Enables administrators or authorized users to update the details of a specific product identified by its ID.

- **Delete Product**:
  - Method: DELETE
  - Endpoint: `/product/delete/:id`
  - Description: Allows administrators or authorized users to delete a product from the shop based on its ID.
    

  
### Frontend

- **React**: A JavaScript library for building user interfaces, enabling the creation of interactive UIs efficiently.
- **Context API**: A feature in React that allows sharing state across the application without having to pass props manually at every level.
- **Chakra UI**: A simple, modular, and accessible component library that provides a set of customizable UI components for React applications.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible remotely.

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the backend server using `npm start`.
5. Navigate to the client directory (`cd client`).
6. Install frontend dependencies using `npm install`.
7. Start the frontend server using `npm start`.

## Usage

Once the application is up and running, users can sign up or log in to their accounts. They can browse the available products, add items to their cart, and proceed with checkout. Additionally, users can manage their profile information and view their order history.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the standard GitHub flow: fork the repository, create a new branch, make your changes, and submit a pull request.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


