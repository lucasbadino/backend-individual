import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Products } from "../../../modules/products/products.entity";


export class CreateOrderDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426655440000',
        description: 'User id',
        required: true
    })
    @IsNotEmpty()
    @IsUUID()

    userId: string;
    @IsArray()
    @ApiProperty({
        example:
            [
                {
                    "id": "9164a213-0d75-4da5-8a10-f34b16910042",
                    "name": "Razer Viper",
                    "description": "The best mouse in the world",
                    "price": "49.99",
                    "stock": 12,
                    "imgUrl": "https://via.placeholder.com/300"
                }
            ]

    })
    products: Products[]
}
