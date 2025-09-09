import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
constructor(private users: UsersService, private jwt: JwtService) {}


async validateUser(email: string, pass: string) {
const user = await this.users.findByEmail(email);
if (!user) return null;
const match = await bcrypt.compare(pass, user.passwordHash);
if (match) return user;
return null;
}


async login(user: any) {
const payload = { sub: user.id, email: user.email };
return { access_token: this.jwt.sign(payload) };
}


async register(email: string, password: string) {
const existing = await this.users.findByEmail(email);
if (existing) throw new UnauthorizedException('Email already registered');
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
const token = Math.random().toString(36).slice(2, 15);
const user = await this.users.create({ email, passwordHash: hash, emailVerificationToken: token });
// TODO: send email - for now log verification link
console.log(`Verify user: /auth/verify?token=${token}`);
return user;
}


async verifyEmail(token: string) {
const user = await this.users.findByVerificationToken(token);
if (!user) throw new UnauthorizedException('Invalid token');
return this.users.markVerified(user.id);
}
}