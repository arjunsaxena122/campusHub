import mongoose from "mongoose"
import { z } from "zod"
import { AvailableStudentGenderEnum, AvailableStudentStatusEnum, StudentGenderEnum, StudentStatusEnum } from "../constant"

export const createResultValidaton = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { error: "Invalid userID" }),
    studentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { error: "Invalid studentID" }),
    studentName: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
    fatherName: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
    motherName: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
    courseName: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
    branchName: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
    gender: z.enum([StudentGenderEnum.MALE, StudentGenderEnum.FEMALE]).refine((val) => AvailableStudentGenderEnum.includes(val), { error: "Invalid gender" }),
    semester: z.number().default(1),
    status: z.enum([StudentStatusEnum.ACTIVE, StudentStatusEnum.FAIL, StudentStatusEnum.INACTIVE, StudentStatusEnum.PASS]).refine((val) => AvailableStudentStatusEnum.includes(val), {
        error: "Invalid student result status"
    }),
    subject: z.array(
        z.object({
            name: z.string().min(3, "Atleast 3 character").max(16, "upto 16 character"),
            marks: z.number().min(0, "minimum number is 0").max(100, "upto only 100 number").default(0),
        })
    ),
    grade: z.string().default("F"),
    totalMarks: z.number().min(0, "minimum number is 0").max(100, "upto only 100 number").default(0),
    cgpa: z.number().min(0, "minimum number is 0").max(100, "upto only 100 number").default(0),
})

export const getResultByAllStudentValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userId"
    })
})

export const getResultByStudentIdValidation = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid userId"
    }),
    sid: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid studentId"
    })
})