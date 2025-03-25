import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
    @ApiProperty({
        example: 'Laptop',
        description: 'Product name',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        example: 'Laptop description',
        description: 'Product description',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    @ApiProperty({
        example: 1000,
        description: 'Product price',
        required: true
    })
    @IsNumber()
    price: number;
    @ApiProperty({
        example: 10,
        description: 'Product stock',
    })
    @IsNumber()
    stock: number;
    @ApiProperty({
        example: 'https://facturama.mx/blog/wp-content/uploads/2020/04/Ejemplo-uuid-folio-fiscal-cfdi-3.3-sat-2020.png',
        description: 'Product image url',
    })
    @IsString()
    imgUrl: string;
}
export class UpdateProductDto extends PartialType(
    PickType(CreateProductDto, ['name', 'description', 'price', 'stock', 'imgUrl'] as const)
) {
    @IsString()
    @IsNotEmpty()
    name?: string;
    @IsString()
    @IsNotEmpty()
    description?: string;
    @IsNumber()
    price?: number;
    @IsNumber()
    stock?: number;
    @IsString()
    imgUrl?: string;
}