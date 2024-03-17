# University Node Backend

This project serves as the backend for a University management system, designed to streamline the management of student data, course registrations, and more. Built with Express.js and TypeScript, it emphasizes strong typing and modern asynchronous patterns for handling HTTP requests.

## Features

- **Express.js with TypeScript**: Leveraging the robustness of Express.js combined with the strong typing provided by TypeScript for scalable and maintainable backend development.
- **Custom Validation and DTOs**: Implements custom validation and Data Transfer Objects (DTOs) to ensure the integrity and correctness of request data.
- **Absolute Imports**: Simplifies import paths throughout the project, enhancing readability and maintainability.
- **Custom Migration Utility**: Facilitates the management of database schema changes and data migrations, ensuring consistency and reliability across different environments.
- **Reflective Middleware and Utilities**: Features like `asyncHandler` for improved error handling in asynchronous routes, and structured constants for consistent validation messages.

## Getting Started

### Prerequisites

- Node.js (version >=18.0.0 or higher recommended)
- npm (version >=8.0.0 or higher)

### Installation

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

### Running the Application

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
npm start
```

## Custom Migration Utility

We have developed a custom migration utility to streamline database migrations, ensuring that your schema changes are versioned and consistently applied across all environments.

### Key Features:

- **Automatic Migration Generation**: Automatically generates migration files based on changes to your TypeORM entities.
- **Simplified Migration Execution**: Easily apply and revert migrations to manage your database schema.

### Using the Migration Utility:

- **Generate Migrations**: After updating entities, generate a migration file with `npm run migration:generate thereMigrationName(optional)`.
- **Run Migrations**: Apply migrations to your database using `npm run migration:run`.
- **Revert Migrations**: Safely rollback the most recent migration with `npm run migration:revert`.

## Project Structure

- **`src/`**: Contains all source files.
  - **`controllers/`**: Handles incoming requests and returns responses to the client.
  - **`entities/`**: Represents database tables and relations.
  - **`services/`**: Contains the core business logic.
  - **`dtos/`**: Ensures type safety and validation for incoming data.
  - **`constants/`**: Stores validation rules and other constant values.
  - **`utils/`**: Provides utility functions and middleware.
  - **`app.ts`**: The entry point of the application.
- **`dist/`**: Contains compiled JavaScript files, ready for production.

## Usage

Detailed usage instructions, including available endpoints and sample requests/responses, will be added as the API is finalized.

## Contributing

Guidelines for contributing to the project will be established, including code style, pull request procedures, and other essential practices.

## License

The project is open-source under the MIT license.
