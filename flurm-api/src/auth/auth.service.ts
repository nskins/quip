import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getByEmail(email);

        console.log(user);
        
        // TODO: hash the RHS password w/ a library like bcrypt
        if (user && user.hashedPassword === password) {
            const { hashedPassword, ...result } = user;
            return result;
        }
        return null;
    }
}
