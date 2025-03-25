import { Controller, FileTypeValidator, HttpException, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Response } from 'express';
import { ProductService } from '../../modules/products/products.service';
import { AuthGuard } from '../../modules/auth/authGuard/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Upload image')
@Controller('files/uploadImage')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly productService: ProductService
    ) { }
    @UseGuards(AuthGuard)
    @Post(':id')
    @ApiOperation({ summary: 'Agrega una imagen al producto' })
    @ApiResponse({ status: 201, description: 'Creado con exito' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 400, description: 'Error al subir el archivo' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200 * 1000,
                    message: 'Archivo demasiado grande'
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)/
                })
            ]
        })
    ) file: Express.Multer.File, @Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
        try {
            const user = await this.productService.getPruductsById(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            const result: any = await this.cloudinaryService.uploadFile(file);

            await this.productService.updateImageProduct(id, result.url);

            return res.status(200).send({
                uploadStatus: true,
                result
            });
        } catch (error) {
            throw new HttpException('Error al subir el archivo', HttpStatus.BAD_REQUEST);
        }

    }
}
