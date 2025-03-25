import { ApiProperty, ApiTags, PartialType, PickType } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsNotEmpty, Length, IsStrongPassword, IsOptional } from 'class-validator';
export class CreateUserDto {
    @ApiProperty(
        {
            name: 'name',
            description: 'user name must be not empty and must be a string with a length between 3 and 80 characters',
            example: 'John Doe'
        }
    )
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string
    @ApiProperty(
        {
            name: 'email',
            description: 'user email must be not empty and must be a string with a length between 3 and 80 characters',
            example: 'bXJk6@example.com'
        }
    )
    @IsNotEmpty()
    @IsEmail()
    @Length(3, 80)
    email: string
    @ApiProperty(
        {
            name: 'password',
            description: 'user password must be not empty and must be a string with a length between 8 and 15 characters',
            example: 'Example123!'
        }
    )
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Length(8, 15)
    password: string
    @ApiProperty(
        {
            example: 'Example123!',
            description: 'User password',
            required: true
        }
    )
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Length(8, 15)
    confirmPassword: string
    @ApiProperty(
        {
            name: 'address',
            description: 'user address must be not empty and must be a string with a length between 3 and 80 characters',
            example: '123 Main St'
        }
    )
    @IsString()
    @Length(3, 80)
    address: string
    @ApiProperty(
        {
            name: 'phone',
            description: 'user phone must be not empty and must be a number',
            example: '123456789'
        }
    )
    @IsNumber()
    @IsNotEmpty()
    phone: number
    @ApiProperty(
        {
            name: 'country',
            description: 'user country must be not empty and must be a string with a length between 5 and 20 characters',
            example: 'Argentina'
        }
    )
    @IsString()
    @Length(5, 20)
    country: string
    @ApiProperty(
        {
            name: 'city',
            description: 'user city must be not empty and must be a string with a length between 5 and 20 characters',
            example: 'Cordoba'
        }
    )
    @IsString()
    @Length(5, 20)
    city: string
}
export class UpdateUserData extends PartialType(
    PickType(CreateUserDto, ['name', 'email', 'password', 'address', 'phone', 'country', 'city'] as const)
) {
    @ApiProperty({
        name: 'User data update',
        description: 'Dto to update user data',
    })
    @IsOptional()
    name?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    phone?: number;

    @IsOptional()
    country?: string;

    @IsOptional()
    city?: string;
}