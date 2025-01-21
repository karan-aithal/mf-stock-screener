import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";

export class AuthController {
  async register(name: string, username: string, password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
    });

    return user;
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token, role: user.role };
  }

  async googleLogin(profile: any) {
    const { id, displayName, emails } = profile;
    const email = emails[0].value;

    let user = await User.findOne({ where: { email, provider: "google" } });
    if (!user) {
      // Register a new user if they don't exist
      user = await User.create({
        name: displayName,
        email,
        username: email,
        provider: "google",
        oauthId: id,
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token, role: user.role };
  }
}
