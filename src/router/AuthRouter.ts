import { Router } from "express";
import AuthController from "../controllers/AuthController";

class AuthRouter {
    public static register(router: Router): void {
        router.get("/auth/register", AuthController.register);
        router.post("/auth/login", AuthController.login);
    }
}

export default AuthRouter;
