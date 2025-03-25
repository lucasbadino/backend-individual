import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./products.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Products]),
    ],
    providers: [ProductService,ProductsRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductsRepository]
})
export class ProductModule { }
