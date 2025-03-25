import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserService } from "../users/users.service";
import { LoginUserDto, singupDto } from "./authDto/authDto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthRepository {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,

    ) { }
    async singin(LoginUserDto: LoginUserDto) {
        const { email, password } = LoginUserDto;
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new HttpException('usuario o contraseña incorrecta', HttpStatus.NOT_FOUND);
        }
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role
        }
        const token = this.jwtService.sign(userPayload);
        return { success: true, token }
    }
    async singup(user: singupDto) {
        const email = await this.usersService.getUserByEmail(user.email);
        if (email) {
            throw new HttpException('El email ya existe', HttpStatus.CONFLICT);
        }
        if (user.password !== user.confirmPassword) {
            throw new HttpException('Las contraseñas no coinciden', HttpStatus.BAD_REQUEST);
        }
        try {
            const hassedPassword = await bcrypt.hash(user.password, 10);
            if (hassedPassword) {
                user.password = hassedPassword
                delete user.confirmPassword
                const newUser = await this.usersService.CreateUser(user);
                if (newUser) {
                    const { password, ...rest } = newUser;
                    return rest
                }
            }
        } catch (error) {
            throw new HttpException('Error al crear el usuario', HttpStatus.NOT_FOUND);
        }
    }
}