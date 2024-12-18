import { z } from "zod";

export const toDoSchema = z
  .string({
    required_error: "To Do must not be empty",
    invalid_type_error: "Must be a string",
  })
  .min(4, { message: "To Do must be at least 4 characters long" });
