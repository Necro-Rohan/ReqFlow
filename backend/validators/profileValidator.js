import { z} from "zod";

const nonEmptyString = z
  .string()
  .min(3, "Must be at least 3 characters long")
  .refine((val) => val.trim().length > 0, "This field Cannot be empty");

export const updateProfileSchema = z
  .object({
    name: nonEmptyString.optional(),
    username: nonEmptyString.optional(),
    bio: z.string().max(160).optional(),
    avatarUrl: z.preprocess(
      (val) => (val) === "" ? undefined : val,
      z.url("Invalid URL").optional()
    )
  })
  .strict();

export const updateEmailSchema = z.object({
  email: z.email("Invalid email address")
});
