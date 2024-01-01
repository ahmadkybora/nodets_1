import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../repository";
import { authentication, random } from "../utils";

class AuthController {

    private static userName: string = "";
    private static email: string = "";
    private static password: string = "";
    private static confirmation_password: string = "";

    public static async login(req: Request, res: Response)
    {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(400);
            }
            const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
            if(!user) {
                return res.sendStatus(400);
            }
            const expectedHash = authentication(user.authentication.salt, password);
            if(user.authentication.salt !== expectedHash) {
                return res.sendStatus(400);
            }
            const salt = random();
            user.authentication.sessionToken = authentication(salt, user._id.toString());
            await user.save();

            res.cookie("APP_AUTH", user.authentication.sessionToken, { doamin: "localhost", path: "/" });
            return res.status(200).json(user).end();
            
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    public static async register(req: Request, res: Response)
    {
        try {
            const { userName, email, password, confirmation_password } = req.body;
            if(!email || !userName || !password) {
                return res.status(400);
            }

            const existingUser = await getUserByEmail(email);
            if(existingUser) {
                return res.sendStatus(400);
            }
            const salt = random();
            const user = await createUser({ 
                email,
                userName,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                }
            });
            return res.status(200).json(user).end();
        } catch (error) {
            return res.sendStatus(400);
        }
    }
}

export default AuthController;
