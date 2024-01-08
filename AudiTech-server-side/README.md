# AudiTech-BackEnd

This is a user management system that allows users to create accounts, log in, and log out. It uses a MongoDB database to store user information and provides secure authentication using JWT (JSON Web Tokens).

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

  https://github.com/Khalil-Bchir/AudiTech-BackEnd.git

2. Install the required dependencies:

   ```
   npm install
   ```

3. Set up the MongoDB connection by replacing the connection string in the `Server.js` file with your own MongoDB URI.

## Usage

1. Start the server:

   ```
   npm run dev
   ```

2. Access the API endpoints using a tool like Postman or a web browser.

### User Creation example

- **Endpoint:** POST `/api/user`
- **Description:** Creates a new user account.
- **Request Body:**

  ```json
  {
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "userType": "SAD",
    "file": [image file]
  }
  ```

- **Response:**

  ```json
  {
    "savedUser": {
      "_id": "60cfd8e682ee1d0015a88a81",
      "name": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "password": "$2a$10$TmuOZ6vugCN1rfeoZTkZ/uuBc55WkNSvMw7a0nGMNGnOV0qJyWXFm",
      "userId": "23SAD001",
      "userType": "SAD",
      "file": "1624314807047--profile.jpg",
      "createdAt": "2023-06-21T12:20:38.074Z",
      "updatedAt": "2023-06-21T12:20:38.074Z",
      "__v": 0
    }
  }
  ```
  
  ### Section Creation example

- **Endpoint:** POST `/api/Section`
- **Description:** Creates a new section.
- **Request Body:**

  ```json
  {
    "name": "health departement 101",
    "description": "description for section"
  }
  ```

- **Response:**

  ```json
  {
    "sectionID": "SEC004",
    "name": "health departement 101",
    "description": "description for section",
    "_id": "64a1e6d9af7add10bc35abd0",
    "__v": 0
  }
  ```

  ### Question Creation example

- **Endpoint:** POST `/api/Question`
- **Description:** Creates a new Question.
- **Request Body:**

  ```json
  {
    "section": "SEC002",
    "text": "What is your Favorite food?",
    "attributes": [
        {
            "name": "Category",
            "value": "Preference"
        },
        {
            "name": "Type",
            "value": "Multiple Choice"
        }
    ]
  }
  ```

- **Response:**

  ```json
  {
    "questionID": "QST001",
    "section": "SEC002",
    "text": "whatisyourfavoritefood?",
    "attributes": [
        {
            "name": "Category",
            "value": "Preference",
            "_id": "64a3fd1a97541cae1731f6b4"
        },
        {
            "name": "Type",
            "value": "Multiple Choice",
            "_id": "64a3fd1a97541cae1731f6b5"
        }
    ],
    "_id": "64a3fd1a97541cae1731f6b3",
    "__v": 0
  }
  ```

## API Endpoints

**User Endpoints:**

- `POST /api/user`: Create a new user.
- `GET /api/users`: Get all users.
- `GET /api/user/:userId`: Get a user by ID.
- `PUT /api/user/:userId`: Update a user.
- `DELETE /api/user/:userId`: Delete a user.

**Log Endpoints:**

- `POST /api/logIn`: Log in with email and password.
- `POST /api/logOut`: Log out.

**Section Endpoints:**

- `POST /api/Sections`: Create new section.
- `GET /api/sections`: Retrieve sections list.
- `GET /api/Section/:sectionID`: Retrieves single Section details based on its id provided.
- `PUT /api/Section/:sectionID`: Update a section.
- `DELETE /api/Section/:sectionID`: Delete a section.

**Question Endpoints:**

- `POST /api/Qusetion`: Create a new Qusetion.
- `GET /api/Questions`: Get all Qusetions.
- `GET /api/Qusetion/:questionID`: Get a Qusetion by questionID.
- `PUT /api/Qusetion/:questionID`: Update a Qusetion.
- `DELETE /api/Qusetion/:questionID`: Delete a Qusetion.


The API will be available at `http://localhost:3000/api`.
## File Uploads

The API supports file uploads for user profiles. When creating or updating a user, send a multipart/form-data request with the `file` field containing the user's profile picture.

The uploaded files are stored in the `uploads` directory.

## Authentication

User authentication is implemented using JSON Web Tokens (JWT). When logging in, the API returns an access token that should be included in subsequent requests in the `Authorization` header as follows:



## Contributing

Contributions to this user management system are welcome. If you find any issues or have suggestions for improvement, feel free to submit a pull request.
