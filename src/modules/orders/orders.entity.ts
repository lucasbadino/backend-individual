import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Users } from "../users/users.entity"; 
import { OrderDetails } from "../ordersDetails/orderDetails.entity";


@Entity({
    name: 'orders'
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    @ManyToOne(() => Users, (user) => user.orders)
    user: Users;
    @Column({
        type: 'date'
    })
    date: Date;
    @OneToOne(() => OrderDetails,(orderDetail)=>orderDetail.order)
    orderDetail: OrderDetails
}