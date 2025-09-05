import { z } from "zod"
import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";
import mongoose from "mongoose";

export const userRegisterValidationSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty({
            message: "email is required",
        })
        .email({
            message: "Invalid email",
        }),
    password: z
        .string()
        .trim()
        .nonempty({
            message: "Password is required",
        })
        .min(8, { message: "Password must be minimum 8 length" })
        .max(16, { message: "Password length exceed" }),
    role: z.enum([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]).default(UserRolesEnum.STUDENT).refine((val) => AvailableUserRolesEnum.includes(val), {
        error: "Assgin invalid role"
    })
});

export const userLoginValidationSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty({
            message: "email is required",
        })
        .email({
            message: "Invalid email",
        }),
    password: z
        .string()
        .trim()
        .nonempty({
            message: "Password is required",
        })
        .min(8, { message: "Password must be minimum 8 length" })
        .max(16, { message: "Password length exceed" }),
});

export const userLogoutValidationSchema = z.object({
    id: z.string().refine(async (id) => {
        mongoose.Types.ObjectId.isValid(id)
    }, {
        error: "Invalid userID"
    })
});

export const userGetValidationSchema = z.object({
    id: z.string().refine(async (id) => {
        mongoose.Types.ObjectId.isValid(id)
    }, {
        error: "Invalid userID"
    })
});

export const userApiKeyValidationSchema = z.object({
    id: z.string().refine(async (id) => {
        mongoose.Types.ObjectId.isValid(id)
    }, {
        error: "Invalid userID"
    }),
    incomingRefreshToken: z.string().min(1, "Refresh Token is required")
});