import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';

type UserParams = { id: number };

@Controller('users')
export class UsersController {
    constructor(private UsersService : UsersService) {}

    @Get()
    async getAll() : Promise<User[]> {
        return await this.UsersService.getAll()
    }

    @Post()
    async create(@Body() user : User) : Promise<User> {
        return await this.UsersService.create(user);
    }

    @Get(':id')
    async getOne(@Param() params: UserParams): Promise<User> {
        return await this.UsersService.getOne(params.id);
    }

    @Put(':id')
    async update(@Param() params: UserParams, @Body() user: User) : Promise<UpdateResult> {
        return await this.UsersService.update(params.id, user);
    }

    @Delete(':id')
    async delete(@Param() params: UserParams) : Promise<DeleteResult> {
        return await this.UsersService.delete(params.id);
    }
}
