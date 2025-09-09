import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}


async create(data: { email: string; passwordHash: string; emailVerificationToken?: string }) {
return this.prisma.user.create({ data });
}


async findByEmail(email: string) {
return this.prisma.user.findUnique({ where: { email } });
}


async findById(id: string) {
return this.prisma.user.findUnique({ where: { id } });
}


async findByVerificationToken(token: string) {
return this.prisma.user.findFirst({ where: { emailVerificationToken: token } });
}


async markVerified(id: string) {
return this.prisma.user.update({ where: { id }, data: { isEmailVerified: true, emailVerificationToken: null } });
}
}