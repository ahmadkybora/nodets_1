import { Router } from "express";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";

const router = Router();

export default(): Router => {
    UserRouter(router);
    AuthRouter.register(router);
    return router;
}
