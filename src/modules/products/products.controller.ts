import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Response } from "express";
import { AuthGuard } from "../auth/authGuard/auth.guard";
import { CreateProductDto, UpdateProductDto } from "./productsDto/productsDto";
import { Roles } from "../auth/authRoles/roles.decorator";
import { Role } from "../auth/authRoles/roles.auth";
import { RoleGuard } from "../auth/authGuard/role.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Todos los productos', type: [CreateProductDto] })
    @ApiResponse({ status: 404, description: 'No se encontraron productos' })
    async getProducts(
        @Res() res?: Response,
    ) {
        try {
            const products = await this.productService.getProducts();
            if (!res) {
                return products
            }
            return res.status(200).send(products);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
    @Get(":id")
    @ApiOperation({ summary: 'Obtener un solo producto por id' })
    @ApiResponse({ status: 200, description: 'Obtiene un solo producto', type: [CreateProductDto] })
    @ApiResponse({ status: 404, description: 'No se encontraron productos' })
    async getProductsById(@Param("id", ParseUUIDPipe) id: string, @Res() res?: Response) {
        try {
            const product = await this.productService.getPruductsById(id);
            if (!res) {
                return product
            }
            return res.status(200).send(product);
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Crea un nuevo producto', type: [CreateProductDto] })
    @ApiResponse({ status: 400, description: 'Error al crear el producto' })
    async createProduct(@Body() CreateProductDto: CreateProductDto, @Res() res: Response) {
        try {
            const newProduct = await this.productService.createProduct(CreateProductDto);
            return res.status(201).json({
                message: 'Producto creado',
                producto: newProduct
            });
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }

    }
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(":id")
    @ApiOperation({ summary: 'Modificar un producto' })
    @ApiResponse({ status: 201, description: 'Modifica un producto', type: [CreateProductDto] })
    @ApiResponse({ status: 400, description: 'Error al modificar el producto' })
    async updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() UpdateProductDto: UpdateProductDto, @Res() res: Response) {
        try {
            const updatedProduct = await this.productService.updateProduct(id, UpdateProductDto);
            return res.status(201).json({
                message: 'Producto modificado con exito',
                producto: updatedProduct
            });
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
    @UseGuards(AuthGuard)
    @Delete(":id")
    @ApiOperation({ summary: 'Eliminar un producto' })
    @ApiResponse({ status: 200, description: 'Elimina un producto' })
    @ApiResponse({ status: 404, description: 'No se encontro el producto ' })
    async deleteProduct(@Param("id", ParseUUIDPipe) id: string, @Res() res?: Response) {
        try {
            const deletedProduct = await this.productService.deleteProduct(id);
            if (!res) {
                return deletedProduct
            }
            return res.status(200).json({
                message: 'Producto eliminado con exito',
                producto: deletedProduct
            });
        } catch (error) {
            throw new HttpException(`${error.message}`, HttpStatus.NOT_FOUND);
        }
    }


}