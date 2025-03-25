import { Module } from "@nestjs/common";
import { CategorySeed } from "./category/category.seed";
import { ProductsSeed } from "./products/products.seed";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "../modules/categories/categories.entity";
import { Products } from "../modules/products/products.entity";
import { UsersSeed } from "./users/users.seed";
import { Users } from "../modules/users/users.entity";
import { AuthService } from "../modules/auth/auth.service";
import { AuthRepository } from "../modules/auth/auth.repository";
import { UserService } from "../modules/users/users.service";
import { UsersRepository } from "../modules/users/users.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([Categories, Products, Users]),
    ],
    providers: [CategorySeed, ProductsSeed, UsersSeed, AuthService, AuthRepository, UserService, UsersRepository],
    exports: [CategorySeed, ProductsSeed, UsersSeed]
})
export class SeedsModule { }