import mongoose from "mongoose"
import { z } from "zod"
import { AvailableCourseStatusEnum, AvailableMaterialStatusEnum, CourseStatusEnum, MaterialStatusEnum } from "../constant"

// ! Course

export const createCourseValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    }),
    title: z.string().min(1, "Title is required"),
    descripiton: z.string().min(1, "Descripiton is required"),
    status: z.enum([CourseStatusEnum.COMING_SOON, CourseStatusEnum.COMPLETED, CourseStatusEnum.LIVE]).refine((val) => AvailableCourseStatusEnum.includes(val), {
        error: "Assign invalid course status"
    }),
    price: z.string()
})

export const getAllCourseByIdValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    }),
    cid: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid courseID"
    }),
})

export const getAllCoursesValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    })
})

// ! Material 

export const createMaterialValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    }),
    cid: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid courseID"
    }),
    title: z.string().min(1, "Title is required"),
    descripiton: z.string().min(1, "Descripiton is required"),
    content: z.string().min(1, "Content is required"),
    status: z.enum([MaterialStatusEnum.AVAILABLE, MaterialStatusEnum.NOT_AVAILABLE]).refine((val) => AvailableMaterialStatusEnum.includes(val), {
        error: "Assign invalid Material status"
    }),
})

export const getAllMaterialByIdValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    }),
    mid: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid materialID"
    }),
})

export const getAllMaterialValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userID"
    }),
})