import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as toString from 'buffer-to-stream';
import { ProductService } from '../../modules/products/products.service';

@Injectable()
export class CloudinaryService {
    constructor(
        private readonly productsService: ProductService
    ) { }
    async uploadFile(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result)
            })
            toString(file.buffer).pipe(upload)
        })
    }
}
