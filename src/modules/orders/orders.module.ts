import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./order.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Users } from "../users/users.entity";
import { Products } from "../products/products.entity";
import { OrderDetails } from "../ordersDetails/orderDetails.entity";
import { UserModule } from "../users/users.module";
import { ProductModule } from "../products/products.module";
import { ProductService } from "../products/products.service";
import { UserService } from "../users/users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails]),
        UserModule,
        ProductModule,
    ],
    
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository, ProductModule, UserModule],
    
})
export class OrdersModule{}