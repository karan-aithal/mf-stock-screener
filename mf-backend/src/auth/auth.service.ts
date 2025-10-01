import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private users: UsersService, private jwt: JwtService) { }


    async validateUser(email: string, pass: string) {
        const user = await this.users.findByEmail(email);
        if (!user || !user.passwordHash || !user.isEmailVerified) return null;
        const match = await bcrypt.compare(pass, user.passwordHash);
        return match ? user : null;
    }


    async login(user: User): Promise<{ access_token: string; refreshToken: string }> {
        if (!user.isEmailVerified) throw new UnauthorizedException('Email not verified');
        const payload = { sub: user.id, email: user.email };

        const access_token = this.jwt.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwt.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return { access_token, refreshToken };
    }


    async register(email: string, password: string): Promise<User> {
        const existing = await this.users.findByEmail(email);
        if (existing) throw new UnauthorizedException('Email already registered');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const token = Math.random().toString(36).slice(2, 15);

        const user = await this.users.create({ email, passwordHash: hash, emailVerificationToken: token });
        // TODO: send email - for now log verification link
        console.log(`Verify user: /auth/verify?token=${token}`);
        // TODO: Replace with actual email service
        // console.log(`Verify user: ${process.env.BASE_URL}/auth/verify?token=${token}`);
        return user;
    }


    async verifyEmail(token: string) {
        const user = await this.users.findByVerificationToken(token);
        if (!user) throw new UnauthorizedException('Invalid token');
        await this.users.markVerified(user.id);
        // return this.users.markVerified(user.id);
        return { message: 'Email verified successfully' };
    }
}