import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/config";
import { Request } from "express";
import { AvailableUserRolesEnum, UserRolesEnum } from "../constant";

export interface IRequestAuth extends Request {
  user?: IAuth;
}

type TAvatar = {
  url: string;
  localPath: string;
};

export interface IAuth extends Document {
  _id: Types.ObjectId;
  avatar: TAvatar;
  username: string;
  fullname: string;
  email: string;
  password: string;
  isVerifiedEmail: boolean;
  role: string;
  emailVerificationToken: string;
  emmailVerificationExpiry: Date;
  forgetPasswordToken: string;
  forgetPasswordExpiry: Date;
  refreshToken: string;
}

type TAuthMethod = {
  isCheckingPassword(password: string): Promise<boolean>;
  generatingAccessToken(): string;
  generatingRefreshToken(): string;
};

type TAuthModel = mongoose.Model<IAuth, {}, TAuthMethod>;

const authSchema = new Schema<IAuth, TAuthModel, TAuthMethod>(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        localPath: "",
      },
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      default: "johndoe007",
    },

    fullname: {
      type: String,
      trim: true,
      default: "John Doe",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "email is required"],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },

    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: AvailableUserRolesEnum,
      default: UserRolesEnum.Student,
    },

    emailVerificationToken: {
      type: String,
      default: null,
    },

    emmailVerificationExpiry: {
      type: Date,
    },

    forgetPasswordToken: {
      type: String,
      default: null,
    },

    forgetPasswordExpiry: {
      type: Date,
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

authSchema.methods.isCheckingPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

authSchema.methods.generatingAccessToken = function () {
  return jwt.sign({ id: this._id }, env.ACCESS_TOKEN_KEY, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
  });
};

authSchema.methods.generatingRefreshToken = function () {
  return jwt.sign({ id: this._id }, env.REFRESH_TOKEN_KEY, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
  });
};

export const Auth = mongoose.model("Auth", authSchema);
