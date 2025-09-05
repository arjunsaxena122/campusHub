import mongoose from "mongoose"
import { z } from "zod"

export const createAnnouncementValidation = z.object({
    id: z.string().refine(async (id) => {
        mongoose.Types.ObjectId.isValid(id)
    }, {
        error: "Invalid userID"
    }),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
})
