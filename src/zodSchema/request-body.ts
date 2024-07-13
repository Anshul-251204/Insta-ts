import { z } from "zod";

const signUpBodySchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        })
        .min(4, "UserName is required")
        .toLowerCase(),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a min or 6 digit",
        })
        .min(6, "Password must be a min or 6 digit")
        .max(8, "Password can be a maximum or 8 digit"),
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Invalid Email",
        })
        .email(),
});

const signInBodySchema = z.object({
    username: z.optional(
        z
            .string({
                required_error: "Username is required",
                invalid_type_error: "Username must be a string",
            })
            .min(4, "UserName is required")
            .toLowerCase()
    ),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a min or 6 digit",
        })
        .min(6, "Password must be a min or 6 digit")
        .max(8, "Password can be a maximum or 8 digit"),
    email: z.optional(
        z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Invalid Email",
            })
            .email()
    ),
});

const Zod = {
    signUp: signUpBodySchema,
    signIn: signInBodySchema,
};

export default Zod;
