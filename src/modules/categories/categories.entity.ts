import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Products } from "../products/products.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'categories'
})
export class Categories {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426655440000',
        description: 'Category id is automatically generated',
        required: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @ApiProperty({
        example: 'Electronics',
        description: 'Category name',
        required: true
    })
    @Column({
        length: 50
    })
    name: string
    @OneToMany(() => Products, (product) => product.category)
    products: Products[]
}