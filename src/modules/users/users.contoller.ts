import { Controller, Delete, Get, Post, Put, Res, Param, Body, UseGuards, ParseUUIDPipe, HttpException, HttpStatus, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto, UpdateUserData } from "./usersDto/usersDto";
import { Response } from "express";
import { AuthGuard } from "../auth/authGuard/auth.guard";
import { Users } from "./users.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../auth/authGuard/role.guard";
import { Roles } from "../auth/authRoles/roles.decorator";
import { Role } from "../auth/authRoles/roles.auth";

@ApiTags('Users')
@ApiBearerAuth()
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Usuarios obtenidos con exito' })
    @ApiResponse({ status: 400, description: 'Error al obtener los usuarios' })
    async getUsers(): Promise<Users[]> {
        try {
            return await this.userService.getUsers();
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(":id")
    @ApiOperation({ summary: 'Obtener un usuario por id' })
    @ApiResponse({ status: 200, description: 'Usuario obtenido con exito' })
    @ApiResponse({ status: 400, description: 'Error al obtener el usuario' })
    async getUserById(@Param("id") id: string, @Res() res: Response) {
        try {
            const user = await this.userService.getUserById(id);
            return res.status(200).send(user);

        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
    
    @UseGuards(AuthGuard)
    @Put(":id")
    @ApiOperation({ summary: 'Actualizar un usuario por id' })
    @ApiResponse({ status: 201, description: 'Usuario actualizado con exito' })
    @ApiResponse({ status: 400, description: 'Error al actualizar el usuario' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async updateUser(@Param("id", ParseUUIDPipe) idNumber: string, @Body() UpdateUserData: UpdateUserData, @Res() res: Response) {
        try {
            await this.userService.getUserById(idNumber);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
        try {
            const updatedUser = await this.userService.updateUser(idNumber, UpdateUserData);
            return res.status(201).json(`Usuario actualizado con exito: ${updatedUser.id}`);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
    @UseGuards(AuthGuard)
    @Delete(":id")
    @ApiOperation({ summary: 'Eliminar un usuario por id' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado con exito' })
    @ApiResponse({ status: 400, description: 'Error al eliminar el usuario' })
    async deleteUser(@Param("id", ParseUUIDPipe) idNumber: string, @Res() res: Response) {
        try {
            const deletedUser = await this.userService.deleteUser(idNumber);
            const { id } = deletedUser
            return res.status(200).json(`Usuario eliminado con exito: ${id}`);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

}