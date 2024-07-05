Sure, here’s a detailed README file for your audit app, Odite:

---

# Odite

Odite is an audit application built using Node.js, Express, MongoDB, and Angular. This application provides functionalities for managing audits efficiently, leveraging the power of modern web technologies to offer a robust and scalable solution.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Audit Management**: Create, read, update, and delete audits.
- **User Authentication**: Secure authentication and authorization mechanisms.
- **Responsive Design**: User-friendly interface built with Angular.
- **API Integration**: RESTful API built with Express and Node.js.
- **Database**: MongoDB for efficient data storage and retrieval.
- **Containerization**: Docker and Docker Compose for easy deployment.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automated workflows using Jenkins.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running
- Docker and Docker Compose installed (for containerization)
- Jenkins installed (for CI/CD)

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Khalil-Bchir/Odite.git
cd Odite
```

2. **Backend Setup**

```bash
cd backend
npm install
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
```

## Usage

1. **Start MongoDB**

Ensure MongoDB is running on your local machine or specify a remote MongoDB URI in the configuration.

2. **Run Backend**

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:3000`.

3. **Run Frontend**

```bash
cd frontend
ng serve
```

The frontend application will start on `http://localhost:4200`.

## Configuration

### Backend Configuration

The backend configuration can be set using environment variables or a `.env` file. Below are the key configurations:

- `PORT`: Port on which the backend server will run (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication

### Frontend Configuration

The frontend configuration can be adjusted in the `environment.ts` file.

## Docker

1. **Build and Run Containers**

```bash
docker-compose up --build
```

This command will build and start the application using Docker.

2. **Stop Containers**

```bash
docker-compose down
```

## CI/CD

This project uses Jenkins for CI/CD. Ensure Jenkins is installed and properly configured to use the provided `Jenkinsfile`.

### Key Jenkinsfile Stages

1. **Install Dependencies**
2. **Run Tests**
3. **Build Docker Images**
4. **Deploy Application**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
