import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
imports: [
ConfigModule.forRoot({ isGlobal: true }),
PrismaModule,
AuthModule,
UsersModule,
PortfoliosModule,
],
})
export class AppModule {}
