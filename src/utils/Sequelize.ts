import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
  TimeoutError,
  ConnectionError,
} from "sequelize";
import { Error } from "sequelize/types";

// We handle all sequelize problems to handle translations

export const handleSequelizeError = (err: Error) => {
  if (err instanceof ValidationError) {
    return {
      status: 400,
      message:
        "Validation error: " + err.errors.map((e) => e.message).join(", "),
    };
  }

  if (err instanceof UniqueConstraintError) {
    return {
      status: 409,
      message:
        "Unique constraint violation: " +
        err.errors.map((e) => e.message).join(", "),
    };
  }

  if (err instanceof ForeignKeyConstraintError) {
    return {
      status: 409,
      message: "Foreign key constraint violation: " + err.message,
    };
  }

  if (err instanceof DatabaseError) {
    return {
      status: 500,
      message: "Database error: " + err.message,
    };
  }

  if (err instanceof TimeoutError) {
    return {
      status: 408,
      message: "Database timeout error",
    };
  }

  if (err instanceof ConnectionError) {
    return {
      status: 500,
      message: "Database connection error",
    };
  }

  return null;
};
