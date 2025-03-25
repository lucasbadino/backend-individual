import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { Users } from "../users/users.entity";
import { Products } from "../products/products.entity";
import { OrderDetails } from "../../modules/ordersDetails/orderDetails.entity";
import { ProductService } from "../products/products.service";


@Injectable()
export class OrdersRepository {
    
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>
    ) { }
    async getOrders() {
        return await this.ordersRepository.find({
            relations: {
                user: true,
                orderDetail: {
                    products: true
                }
            }
        })
    }
    async addOrder(CreateOrderDto) {
        try {
            const { userId, products } = CreateOrderDto
            const user = await this.usersRepository.findOne({ where: { id: userId } })
            const order = await this.ordersRepository.create({
                user,
                date: new Date()
            })
            const { totalPrice } = await this.buyProduct(products)
            const orderDetail = await this.orderDetailsRepository.create({
                price: totalPrice,
                products: products.map((product) => product),
            });
            try {
                await this.orderDetailsRepository.save(orderDetail);
                order.orderDetail = orderDetail;
                await this.ordersRepository.save(order);
                return order
            } catch (error) {
                throw new BadRequestException(error)
            }
        }
        catch (error) {
            throw new BadRequestException(`Error al crear la orden: ${error}`);
        }
    }
    async getOrder(id: string): Promise<any> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                user: true,
                orderDetail: {
                    products: true
                }
            }
        });
        if (order) {
            const filteredUser = {
                id: order.user.id,
                username: order.user.name,
                email: order.user.email,
            };
            if (!order) {
                throw new NotFoundException('Order not found');
            }

            return { ...order, user: filteredUser };
        }
    }
    async buyProduct(products) {
        try {
            let totalPrice = 0;
            for (const prod of products) {
                const findedProduct = await this.productsRepository.findOne({ where: { id: prod.productId } });
                if (!findedProduct) {
                    throw new BadRequestException('Product not found');
                }
                if (findedProduct.stock === 0) {
                    throw new BadRequestException('Product out of stock');
                }
                findedProduct.stock -= 1;
                totalPrice += Number(findedProduct.price);
                await this.productsRepository.save(findedProduct);
            }
            return { totalPrice, products };
        } catch (error) {
            throw new BadRequestException(error);

        }
    }

}
