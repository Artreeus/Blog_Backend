

# Blog Management System

## Overview
The Blog Management System is a web-based application designed to streamline user and blog management for admins and users. This robust solution includes user authentication, role-based access control, and CRUD operations for blogs. It is built using modern web technologies for scalability and maintainability.

## Live Demo
Live lInk : https://ratul-blog-dep-test.vercel.app/

Admin Credential :     "email": "john@example.com",
                       "password": "securepassword"

Github Repo : https://github.com/Artreeus/Blog_Backend

## Features
### User Features:
- **Registration and Login**: Secure authentication with password hashing.
- **Blog Management**: Create, update, delete, and view blogs.
- **Role-based Access**: Role-specific features and restrictions.

### Admin Features:
- **User Management**: Block users from accessing the platform.
- **Blog Moderation**: Delete blogs created by any user.

### General Features:
- **Search and Filter**: Search blogs by title or content, and filter by author.
- **Validation and Error Handling**: Comprehensive input validation and structured error responses.

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - TypeScript
  - MongoDB with Mongoose

- **Authentication**:
  - JSON Web Tokens (JWT)
  - bcrypt

- **Validation**:
  - zod

- **Development Tools**:
  - Dotenv
  - Nodemon

## Installation and Setup
### Prerequisites
- Node.js (v16 or above)
- MongoDB instance (local or cloud-based)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/blog-management-system.git
   cd blog-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5000` by default.

## API Endpoints
### Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and receive a token.

### Blogs
- **POST /blogs**: Create a blog (Authenticated users).
- **PATCH /blogs/:id**: Update a blog (Authenticated users).
- **DELETE /blogs/:id**: Delete a blog (Authenticated users).
- **GET /blogs**: Fetch all blogs (Public access).

### Admin
- **PATCH /admin/users/:userId/block**: Block a user (Admin only).
- **DELETE /admin/blogs/:id**: Delete any blog (Admin only).

## Project Structure
```
src/
├── config/          # Database configuration
├── controllers/     # Route handlers
├── middleware/      # Authentication and error handling
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── types/           # TypeScript interfaces
├── utils/           # Helpers and utilities
└── app.ts           # Main entry point
```

## Development Scripts
- **Start in Development Mode**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Run Production Build**:
  ```bash
  npm start
  ```

## Testing
_Coming Soon: Add details about testing when implemented._

## Contributing
Contributions are welcome! Please submit a pull request or create an issue to propose changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, contact [your-email@example.com].


