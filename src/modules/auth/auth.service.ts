import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { LoginUserDto, singupDto } from "./authDto/authDto";

@Injectable()
export class AuthService {

    constructor(private readonly AuthRepository: AuthRepository) { }
    async singin(LoginUserDto: LoginUserDto) {
        return await this.AuthRepository.singin(LoginUserDto);
    }
    async singup(user: singupDto){
        return await this.AuthRepository.singup(user);
    }
}