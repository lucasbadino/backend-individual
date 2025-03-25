import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Products } from "../products/products.entity"; 
import { Orders } from "../orders/orders.entity"; 
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'orderDetails'
})
export class OrderDetails {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426655440000',
        description: 'OrderDetail id is automatically generated',
        required: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
        example: 10.50,
        description: 'price of the product',
        required: true
    })
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number;
    @OneToOne(() => Orders,(order)=>order.orderDetail)
    @JoinColumn()
    order: Orders;

    @ManyToMany(() => Products, (product) => product.OrderDetails)
    products: Products[];

}