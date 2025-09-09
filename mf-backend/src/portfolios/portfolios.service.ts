import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PortfoliosService {
constructor(private prisma: PrismaService) {}


async create(userId: string, name: string, currency = 'INR') {
return this.prisma.portfolio.create({ data: { userId, name, currency } });
}


async listForUser(userId: string) {
return this.prisma.portfolio.findMany({ where: { userId }, include: { holdings: true } });
}


async get(userId: string, id: string) {
const p = await this.prisma.portfolio.findUnique({ where: { id }, include: { holdings: true } });
if (!p) throw new NotFoundException('Portfolio not found');
if (p.userId !== userId) throw new ForbiddenException();
return p;
}


async update(userId: string, id: string, data: { name?: string; currency?: string }) {
const p = await this.get(userId, id);
return this.prisma.portfolio.update({ where: { id: p.id }, data });
}


async remove(userId: string, id: string) {
const p = await this.get(userId, id);
await this.prisma.holding.deleteMany({ where: { portfolioId: p.id } });
return this.prisma.portfolio.delete({ where: { id: p.id } });
}
}