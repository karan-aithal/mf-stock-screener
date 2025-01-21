import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();
const authController = new AuthController();

router.post("/register", async (req, res) => {
  const { name, username, password, email } = req.body;

  try {
    const user = await authController.register(name, username, password, email);
    res.status(201).json(user);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, role } = await authController.login(username, password);
    res.status(200).json({ token, role });
  } catch (error:any) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/google-login", async (req, res) => {
  const { profile } = req.body;

  try {
    const { token, role } = await authController.googleLogin(profile);
    res.status(200).json({ token, role });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
