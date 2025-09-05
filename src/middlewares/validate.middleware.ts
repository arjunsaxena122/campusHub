import { NextFunction, Request, Response } from "express"
import { Source } from "../types/validate.type"
import { ZodType } from "zod"
import { ApiError } from "../utils"

export const validate = (schema: ZodType, source: Source[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: Record<string, unknown> = {}
            for (const src of source) {
                Object.assign(data, req[src])
            }
            await schema.parseAsync(data)
            next()
        } catch (error) {
            next(new ApiError(400, `zod validation failed cause of ${error}`, [error]))
        }

    }
} 