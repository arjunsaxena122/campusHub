import { NextFunction, Request, Response } from "express";
import { env } from "../config/config";

export const customErrorHandler = (err:any, req:Request, res: Response, next:NextFunction) =>{
    const statusCode = err.statusCode
    res.status(statusCode).json({
        message : err.message || "Something arise issue",
        success : err.success || false,
        errors : err.errors || "",
        stack : env?.NODE_ENV !== "production" ? err?.stack : undefined
    })
}