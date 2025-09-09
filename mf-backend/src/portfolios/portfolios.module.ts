import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';


@Module({
imports: [PrismaModule, UsersModule],
controllers: [PortfoliosController],
providers: [PortfoliosService],
})
export class PortfoliosModule {}