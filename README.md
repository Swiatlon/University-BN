# 🎓 University Node Backend

This project serves as the **backend** for a **University Management System**, designed to streamline the management of student data, course registrations, and more. Built with **Express.js** and **TypeScript**, it emphasizes strong typing and modern asynchronous patterns for handling HTTP requests.

---

## 🚀 Features

- **🔧 Express.js with TypeScript**: Leverage the robustness of **Express.js** combined with the strong typing provided by **TypeScript** for scalable and maintainable backend development.
- **✅ Custom Validation and DTOs**: Implements custom validation and **Data Transfer Objects (DTOs)** to ensure the integrity and correctness of request data.
- **📂 Absolute Imports**: Simplifies import paths, enhancing readability and maintainability.
- **🔨 Custom Migration Utility**: Manages database schema changes and data migrations to ensure consistency across environments.
- **⚙️ Reflective Middleware & Utilities**: Includes **asyncHandler** for better error handling and structured constants for consistent validation messages.

---

## 📝 Getting Started

### 📦 Prerequisites

- **Node.js**: Version >=18.0.0 (recommended).
- **npm**: Version >=8.0.0 (recommended).

---

### 🔑 ENV: REMEMBER TO CREATE .env FILE!
### Before running the application, make sure you create a .env file in the root of the project. This file is crucial for defining your environment variables, such as database credentials and API keys.

---

### 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Swiatlon/University-BN
   ```

2. **Navigate to the project directory**:

   ```bash
   cd University-BN
   ```

3. **Install NPM packages**:

   ```bash
   npm install
   ```

4. **Generate a migration**:

   ```bash
   npm run migration:generate name"(optional)"
   ```

5. **Apply migrations**:

   ```bash
   npm run migration:apply
   ```

---

## 🚀 Running the Application

1. **Development mode** with live reloads via `nodemon`:

   ```bash
   npm run dev
   ```

2. **Build the application** for production:

   ```bash
   npm run build
   ```

3. **Start the application** post-build:

   ```bash
   npm start:prod
   ```

---

## 🐳 Docker Compose Setup

This project includes a **Docker Compose** configuration designed for development and production environments. The `docker-compose.yml` file simplifies running the application, database, and related services.

### 🏗️ Key Features

- **Development & Production Profiles**: Easily switch between development and production using Docker Compose profiles (`dev` or `prod`).
- **Integrated Database**: **PostgreSQL** is included as a service, pre-configured to work with the application.
- **Modular Repository Structure**: Works alongside the frontend repository for seamless orchestration in a unified environment.

---

### 🔑 Prerequisites

1. Clone both **frontend** and **backend** repositories into the same parent directory:

   ```bash
   git clone https://github.com/Swiatlon/University-FN University-FN
   git clone https://github.com/Swiatlon/University-BN University-BN
   ```

2. Ensure the parent directory looks like this:

   ```
   Parent Directory/
   ├── University-FN/   # Frontend repository
   └── University-BN/   # Backend repository
   ```

3. Place the provided `docker-compose.yml` file in the **parent directory**.

---

### 🔄 How to Use `docker-compose.yml`

#### 1. Clone Repositories

```bash
git clone https://github.com/Swiatlon/University-FN University-FN
git clone https://github.com/Swiatlon/University-BN University-BN
```

#### 2. Organize Your Project

Ensure your directory looks like this:

```
Parent Directory/
├── docker-compose.yml  # Unified orchestration file
├── University-FN/      # Frontend repository
└── University-BN/      # Backend repository
```

#### 3. Remove Individual Compose Files

If `docker-compose.yml` files exist in **University-FN** or **University-BN** repositories, remove them to avoid conflicts.

#### 4. Generate Migration

Before running the containers, generate migrations for your backend:

```bash
cd University-BN
npm run migration:generate <migration-name>
```

#### 5. Start Services

Run the following commands from the **parent directory**:

- **Development Mode**:

   ```bash
   docker-compose --profile dev up --build
   ```

- **Production Mode**:

   ```bash
   docker-compose --profile prod up --build
   ```

#### 6. Stop Services

To stop and clean up all services:

```bash
docker-compose down
```

---

### 📜 Service Details

- **Frontend**:
  - Access at `http://localhost:5173` (development mode).
  - Built using Dockerfile in the `University-FN` repository.
  
- **Backend**:
  - Access at `http://localhost:8800`.
  - Includes automatic database migrations and seeders for development.
  
- **Database**:
  - **PostgreSQL** runs in a container, pre-configured for the backend.

---

## 🔧 Custom Migration Utility

A custom migration utility helps you streamline database migrations, ensuring schema changes are consistently applied across all environments.

### 🎯 Key Features

- **Automatic Migration Generation**: Generates migration files based on TypeORM entity changes.
- **Simplified Migration Execution**: Apply or revert migrations with ease.

---

### ⚙️ Using the Migration Utility

- **Generate Migrations**: After updating entities, generate a migration file:

  ```bash
  npm run migration:generate <migration-name>
  ```

- **Run Migrations**: Apply migrations to the database:

  ```bash
  npm run migration:run
  ```

- **Revert Migrations**: Rollback the most recent migration:

  ```bash
  npm run migration:revert
  ```

---

## 📂 Project Structure

- **`src/`**: Contains all source files.
  - **`controllers/`**: Handles incoming requests and returns responses to clients.
  - **`entities/`**: Represents database tables and relations.
  - **`services/`**: Contains core business logic.
  - **`dtos/`**: Ensures type safety and validation for incoming data.
  - **`constants/`**: Stores validation rules and constants.
  - **`utils/`**: Provides utility functions and middleware.
  - **`app.ts`**: The entry point of the application.
- **`dist/`**: Contains compiled JavaScript files for production.

---

## 👨‍💻 Contributing

Guidelines for contributing to the project will be established, including code style, pull request procedures, and best practices.

---

## 📝 License

The project is open-source under the **MIT license**.

---

Let me know if you'd like any further adjustments! 😊