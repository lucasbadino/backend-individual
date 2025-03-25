import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Res,
    UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./order.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { Response } from "express";
import { AuthGuard } from "../auth/authGuard/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }
    @Get()
    @ApiOperation({ summary: 'Obtener todas las ordenes' })
    @ApiResponse({ status: 200, description: 'Las ordenes fueron encontradas con exito' })
    @ApiResponse({ status: 404, description: 'Las ordenes no fueron encontradas' })
    async getOrders(@Res() res: Response) {
        try {
            const orders = await this.ordersService.getOrders();
            res.status(200).send(orders);
        } catch (error) {
            throw new HttpException('Error al obtener las ordenes', HttpStatus.NOT_FOUND);
        }
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una orden por su id' })
    @ApiResponse({ status: 200, description: 'La orden fue encontrada con exito', type: CreateOrderDto })
    @ApiResponse({ status: 404, description: 'La orden no fue encontrada' })
    async getOrder(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
        try {
            const order = await this.ordersService.getOrder(id);
            res.status(200).send(order);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: 'Crear una orden' })
    @ApiResponse({ status: 201, description: 'La orden fue creada con exito', type: CreateOrderDto })
    @ApiResponse({ status: 400, description: 'Error al crear la orden' })
    async createOrder(@Body() CreateOrderDto: CreateOrderDto, @Res() res: Response) {
        try {
            await this.ordersService.createOrderService(CreateOrderDto);
            res.status(201).send('Orden creada con exito');

        } catch (err) {
            throw new HttpException("Error al crear la orden", HttpStatus.BAD_REQUEST);
        }
    }
}