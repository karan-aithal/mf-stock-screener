import { Body, Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) { }


  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.auth.register(body.email, body.password);
    return { id: user.id, email: user.email };
  }


  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.auth.validateUser(body.email, body.password);
    if (!user) return { error: 'Invalid credentials' };
    return this.auth.login(user);
  }


  @Get('verify')
  async verify(@Query('token') token: string) {
    await this.auth.verifyEmail(token);
    return { ok: true };
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    const user = await this.users.findById(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { id: user.id, email: user.email, isEmailVerified: user.isEmailVerified };
  }
}