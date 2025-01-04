import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getByEmail(email);
        
        if (user) {
            const validPassword = await bcrypt.compare(password, user.hashedPassword);
            if (validPassword)
            {
                const { hashedPassword, ...result } = user;
                return result;
            }
        }
        return null;
    }

    // TODO: fix the parameter type
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
