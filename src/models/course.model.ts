import mongoose, { Schema } from "mongoose";
import { AvailableCourseStatusEnum } from "../constant";

const courseSchema = new Schema(
  {

    coverImage : {
        url : {
            type : String,
            default : "https://placehold.co/600x400"
        },

        localPath : {
            type : String,
            default : ""
        }
    },

    title: {
      type: String,
      trim: true,
      unique: true,
      reqiured: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: AvailableCourseStatusEnum,
      required: true,
    },

    price: {
      type: String,
      reqiured: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model("Course", courseSchema);
