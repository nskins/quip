import { Controller, Get, Post, Param, Put, Delete, Body, UseGuards, Request} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../users/user.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

type UserParams = { id: number };

@Controller('users')
export class AuthController {
    constructor(
        private usersService : UsersService,
        private authService: AuthService
    ) {}

    @Get()
    async getAll() : Promise<User[]> {
        return await this.usersService.getAll()
    }

    @Post()
    async create(@Body() credentials : {email: string, password: string}) : Promise<User> {
        return await this.usersService.create(credentials);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param() params: UserParams): Promise<User> {
        return await this.usersService.getOne(params.id);
    }

    @Put(':id')
    async update(@Param() params: UserParams, @Body() user: User) : Promise<UpdateResult> {
        return await this.usersService.update(params.id, user);
    }

    @Delete(':id')
    async delete(@Param() params: UserParams) : Promise<DeleteResult> {
        return await this.usersService.delete(params.id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
