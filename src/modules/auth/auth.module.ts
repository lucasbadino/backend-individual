import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { UserModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";

@Module({
    providers: [AuthService, AuthRepository],
    controllers: [AuthController],
    imports: [UserModule, TypeOrmModule.forFeature([Users])],
    exports: [AuthService, AuthRepository]

})
export class AuthModule { }