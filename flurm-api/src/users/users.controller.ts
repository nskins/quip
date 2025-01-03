import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';


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
    async getOne(@Param() id: number): Promise<User> {
        return await this.UsersService.getOne(id);
    }

    @Put(':id')
    async update(@Param() id: number, @Body() user: User) : Promise<UpdateResult> {
        return await this.UsersService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param() id : number) : Promise<DeleteResult> {
        return await this.UsersService.delete(id);
    }
}
