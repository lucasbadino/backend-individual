import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto, UpdateUserData } from "./usersDto/usersDto";


@Injectable()
export class UserService {



    constructor(private readonly usersRepository: UsersRepository) { }
    async getUsers() {
        return await this.usersRepository.getUsers();
    }
    async getUserById(id: string) {
        return await this.usersRepository.getUserById(id);
    }
    async getUserByEmail(email: string) {
        return await this.usersRepository.getUserByEmail(email);
    }
    async CreateUser(user: CreateUserDto) {
        return await this.usersRepository.createUser(user);
    }
    async updateUser(id, user: UpdateUserData) {
        return await this.usersRepository.uptadeUser(id, user);
    }
    async deleteUser(id: string) {
        return await this.usersRepository.deleteUser(id);
    }

}