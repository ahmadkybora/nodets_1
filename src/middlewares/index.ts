import {Request , Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "repository";

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if(!currentUserId) {
            return res.sendStatus(403);
        }
        if(currentUserId !== id) {
            return res.sendStatus(403);
        }
        next();
    } catch (error) {
        return res.sendStatus(400);
    }
}
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies["APP_AUTH"];
        if(!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) {
            return res.sendStatus(403);
        }
        merge(req, { identity: existingUser });
        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};