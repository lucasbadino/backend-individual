import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.contoller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { requiresAuth } from "express-openid-connect";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
    ],
    providers: [UserService, UsersRepository],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes('/users/auth0');
    }

}