import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { CreateProductDto, UpdateProductDto } from "./productsDto/productsDto";

@Injectable()
export class ProductService {
    

    constructor(private readonly productsRepository: ProductsRepository) { }
    getProducts() {
        return this.productsRepository.getProducts();
    }
    getPruductsById(id: string) {
        return this.productsRepository.getProductsById(id);
    }
    async createProduct(product: CreateProductDto) {
        return await this.productsRepository.createProduct(product);
    }
    async deleteProduct(id: string) {
        return await this.productsRepository.deleteProduct(id);
    }
    async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
        return await this.productsRepository.updateProduct(id, UpdateProductDto);
    }
    async updateImageProduct(id: string, url) {
        return await this.productsRepository.updateImageProduct(id, url);
    }

}