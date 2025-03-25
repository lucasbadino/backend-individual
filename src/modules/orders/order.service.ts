import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./dto/orders.dto";

@Injectable()
export class OrdersService {
    
    constructor(private ordersRepository: OrdersRepository) { }
    getOrders() {
     return this.ordersRepository.getOrders();
    }
    async getOrder(id: string) {
        return await this.ordersRepository.getOrder(id);
    }
    async createOrderService(CreateOrderDto: CreateOrderDto) {
        try {
            return await this.ordersRepository.addOrder(CreateOrderDto);
        } catch (error) {
            throw `error al crear la orden: ${error}`;
        }
    }
}