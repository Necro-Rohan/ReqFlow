import {z} from "zod";

export const testApiSchema = z.object({
  url: z.url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"], {message: "Invalid HTTP method"}),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.any().optional(),
});