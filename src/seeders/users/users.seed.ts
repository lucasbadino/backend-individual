import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../../modules/auth/auth.service";
import { Role } from "../../modules/auth/authRoles/roles.auth";
import { Users } from "../../modules/users/users.entity";
import { Repository } from "typeorm";

@Injectable()

export class UsersSeed {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private readonly authService: AuthService
    ) { }

    async preloadUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=2');
        const users = await response.json();

        const promises = users.map(async user => {
            const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
            if (!existingUser) {
                const newUser = this.authService.singup({
                    name: user.name,
                    email: user.email,
                    password: user.name + "A123_",
                    confirmPassword: user.name + "A123_",
                    address: user.address.street,
                    phone: user.phone.replace(/\D/g, '').substring(0, 10),
                    country: "Argentina",
                    city: user.address.city,
                    role: Role.Admin
                });
            }
        });
        await Promise.all(promises);
    }
}