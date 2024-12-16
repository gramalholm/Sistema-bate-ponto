import { Router } from "express";
import { sendEmail } from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/send-email", sendEmail);

export { emailRouter };