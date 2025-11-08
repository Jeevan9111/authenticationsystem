# User Authentication & Dashboard API

## Project Objective
Develop a backend API for a user authentication system with secure password handling and token-based authentication, including user and admin dashboards.

## Requirements

### Database Models
1.  **User Model**:
    *   `name`: (required)
    *   `email`: (unique, required)
    *   `password`: (hashed, required)
    *   `role`: (user/admin, default: `user`)
    *   `createdAt`: (timestamp)

### API Endpoints

#### Authentication Endpoints
*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user and return a JWT token.
*   `POST /api/auth/logout`: Log out a user.
*   `GET /api/auth/me`: Get details of the current logged-in user.

#### User Endpoints (Protected Routes)
*   `GET /api/user/dashboard`: Retrieve user dashboard data.
*   `GET /api/user/profile`: Get the current user's profile.
*   `PUT /api/user/profile`: Update the current user's profile.

#### Admin Endpoints (Protected - Admin Only)
*   `GET /api/admin/dashboard`: Retrieve admin dashboard with statistics.
*   `GET /api/admin/users`: Get a list of all users.
*   `DELETE /api/admin/users/:id`: Delete a user by ID.

### Technical Requirements
1.  **Security Features**:
    *   Use `bcrypt` for password hashing (minimum 10 salt rounds).
    *   Generate JWT token on successful login.
    *   Token should expire in 24 hours.
    *   Store secret keys in environment variables.
2.  **Middleware**:
    *   Authentication middleware to verify JWT token.
    *   Authorization middleware to check if a user has an 'admin' role.
    *   Protect routes that require authentication.
3.  **Validation & Error Handling**:
    *   Validate email format.
    *   Password must be at least 6 characters.
    *   Provide proper error messages for:
        *   Duplicate email
        *   Invalid credentials
        *   Unauthorized access
        *   Token expired
    *   Use `express-validator` or Joi for validation (implementation uses `express-validator`).
4.  **Additional Features**:
    *   Return appropriate HTTP status codes.
    *   CORS configuration for frontend communication.
    *   Rate limiting (optional, not implemented in this version).

### Technologies Used
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB with Mongoose**: NoSQL database and ODM (Object Data Modeling) library.
*   **bcrypt**: Library for hashing passwords.
*   **jsonwebtoken (JWT)**: For implementing token-based authentication.
*   **dotenv**: To load environment variables from a `.env` file.

## Setup Instructions

### Prerequisites
*   Node.js (LTS version recommended)
*   MongoDB (running locally or accessible via a cloud service like MongoDB Atlas)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd AuthenticationSystem
    ```
    (Replace `<YOUR_REPOSITORY_URL>` with the URL of your GitHub repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create `.env` file:**
    Copy the `.env.example` file and rename it to `.env`.
    ```bash
    cp .env.example .env
    ```
    Then, open `.env` and fill in your environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_strong_secret_key_for_jwt
    JWT_EXPIRE=24h
    ```
    *   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/authdb` or your MongoDB Atlas connection string).
    *   `JWT_SECRET`: A long, random string for signing your JWT tokens.
    *   `JWT_EXPIRE`: The expiration time for your JWT tokens (e.g., `24h` for 24 hours).

### Running the Project
To start the development server:
```bash
npm start
```
The API will be running on `http://localhost:5000` (or the port you specified in `.env`).

## API Endpoint Documentation

You can test these endpoints using tools like Postman or Insomnia.

### Authentication
*   **Register User**
    *   `POST /api/auth/register`
    *   Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
*   **Login User**
    *   `POST /api/auth/login`
    *   Body: `{ "email": "john@example.com", "password": "password123" }`
    *   Returns: JWT Token
*   **Get Current User Details**
    *   `GET /api/auth/me`
    *   Headers: `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **Logout User**
    *   `POST /api/auth/logout`
    *   (Typically invalidates the token on the client-side, or server-side if using a blacklist)

### User Management (Protected)
*   **User Dashboard**
    *   `GET /api/user/dashboard`
    *   Headers: `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **Get User Profile**
    *   `GET /api/user/profile`
    *   Headers: `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **Update User Profile**
    *   `PUT /api/user/profile`
    *   Headers: `Authorization: Bearer <YOUR_JWT_TOKEN>`
    *   Body: `{ "name": "Jane Doe", "email": "jane@example.com" }` (or other fields to update)

### Admin Management (Protected - Admin Only)
*   **Admin Dashboard**
    *   `GET /api/admin/dashboard`
    *   Headers: `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Get All Users**
    *   `GET /api/admin/users`
    *   Headers: `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Delete User**
    *   `DELETE /api/admin/users/:id`
    *   Headers: `Authorization: Bearer <ADMIN_JWT_TOKEN>`
    *   (Replace `:id` with the actual user ID)

