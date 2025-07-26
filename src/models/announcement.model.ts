import mongoose, { Schema } from "mongoose";

type TAnnouncement = {
  title: {
    type: String;
    trim: true;
    required: true;
  };
  description: {
    type: String;
    trim: true;
    required: true;
  };
  content: {
    type: String;
    trim: true;
    required: true;
  };

  user: {
    type: Schema.Types.ObjectId;
    ref: "Auth";
  };
};

const announcementSchema = new Schema({}, { timestamps: true });

export const Announcement = mongoose.model("Announcement", announcementSchema);
