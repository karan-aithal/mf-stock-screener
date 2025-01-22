import express from "express";
import { AuthController } from "../controllers/authController";
import passport from "../middlewares/googleAuth";


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


// Redirect to Google for login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;
    // Send token and role to the client
    res.json({ token: user.token, role: user.role });
  }
);


export default router;
