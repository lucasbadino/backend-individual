import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../authRoles/roles.auth";

export class singupDto {
    @ApiProperty(
        {
            example: 'John Doe',
            description: 'User name',
            required: true
        }
    )
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string
    @ApiProperty(
        {
            example: 'bXJk6@example.com',
            description: 'User email',
            required: true
        }
    )
    @IsNotEmpty()
    @IsEmail()
    @Length(3, 80)
    email: string
    @ApiProperty(
        {
            example: 'Example123!',
            description: 'User password',
            required: true
        }
    )
    @IsNotEmpty()
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
            example: 'Example123!',
            description: 'User password',
            required: true
        }
    )
    @IsString()
    @Length(3, 80)
    address: string
    @ApiProperty(
        {
            example: 3574414058,
            description: 'User phone',
            required: true
        }
    )
    @IsNumber()
    @IsNotEmpty()
    phone: number
    @ApiProperty(
        {
            example: 'Argentina',
            description: 'User country',
            required: true
        }
    )
    @IsString()
    @Length(5, 20)
    country: string
    @ApiProperty(
        {
            example: 'Buenos Aires',
            description: 'User city',
            required: true
        }
    )
    @IsString()
    @Length(5, 20)
    city: string
    @ApiProperty(
        {
            example: Role.Admin,
            description: 'User role',
            default: 'user',
        }
    )
    role?: Role
}
export class LoginUserDto extends PickType(singupDto, ['email', 'password']) { }

