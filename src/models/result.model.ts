import mongoose, { Schema } from "mongoose";
import {
  AvailableStudentGenderEnum,
  AvailableStudentStatusEnum,
} from "../constant";

const resultSchema = new Schema(
  {
    studentId: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "studenId is required"],
    },

    studentName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Student name is required"],
    },

    fatherName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Father name is required"],
    },

    motherName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Mother name is required"],
    },

    courseName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Course name is required"],
    },

    branchName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Branch name is required"],
    },

    gender: {
      type: String,
      enum: AvailableStudentGenderEnum,
      required: [true, "Student Gender is required"],
    },

    semester: {
      type: Number,
      default: 0,
      required: [true, "semester is required"],
    },

    status: {
      type: String,
      enum: AvailableStudentStatusEnum,
      required: true,
    },

    subject: [
      {
        name: { type: String, required: true },
        marks: { type: Number, required: true },
      },
    ],

    grade: {
      type: String,
      trim: true,
      default: "F",
      required: [true, "Grade is required"],
    },

    totalMarks: {
      type: Number,
      default: 0,
      required: [true, "Total Marks is required"],
    },

    cgpa: {
      type: Number,
      default: 0,
      required: [true, "Cgpa is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Result = mongoose.model("Result", resultSchema);
