import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private UserRepository : Repository<User>) {}

    async getAll(): Promise<User[]>{
        return await this.UserRepository.find();
    }

    async create(credentials: {email: string, password: string}) : Promise<User>{
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(credentials.password, salt);

        return await this.UserRepository.save({ 
            email: credentials.email,
            hashedPassword: hash
        });
    }

    async getOne(id: number): Promise<User>{
        return await this.UserRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.UserRepository.findOne({
            where: {
                email: email
            }
        });
    }

    async update(id: number, user: User): Promise<UpdateResult>{
        return await this.UserRepository.update(id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.UserRepository.delete(id);
    }
}
