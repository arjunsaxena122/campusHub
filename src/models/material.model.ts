import mongoose, { Schema } from "mongoose";
import { AvailableMaterialStatusEnum } from "../constant";

const materialSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
      
    },

    status: {
      type: String,
      enum: AvailableMaterialStatusEnum,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true },
);

export const Material = mongoose.model("Material", materialSchema);
