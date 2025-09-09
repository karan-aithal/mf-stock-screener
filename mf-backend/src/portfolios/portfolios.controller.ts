import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('portfolios')
export class PortfoliosController {
    constructor(private svc: PortfoliosService) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: any, @Body() body: { name: string; currency?: string }) {
        return this.svc.create(req.user.sub, body.name, body.currency);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Req() req: any) {
        return this.svc.listForUser(req.user.sub);
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Req() req: any, @Param('id') id: string) {
        return this.svc.get(req.user.sub, id);
    }


    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Req() req: any, @Param('id') id: string, @Body() body: { name?: string; currency?: string }) {
        return this.svc.update(req.user.sub, id, body);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Req() req: any, @Param('id') id: string) {
        return this.svc.remove(req.user.sub, id);
    }
}