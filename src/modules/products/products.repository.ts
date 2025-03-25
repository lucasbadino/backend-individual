import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { Repository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./productsDto/productsDto";

@Injectable()
export class ProductsRepository {

    @InjectRepository(Products)
    private productsRepository: Repository<Products>;

    async getProducts() {
        const products = await this.productsRepository.find();
        return products;

    }

    async getProductsById(id: string) {
        const product = await this.productsRepository.findOneBy({ id })
        return product;
    }
    async createProduct(product: CreateProductDto) {
        const prod = await this.productsRepository.create(product)
        await this.productsRepository.save(prod);
        return prod;

    }
    async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productsRepository.update({ id }, UpdateProductDto)
        return updatedProduct;
    }
    async deleteProduct(id: string) {
        const dataToDelete = await this.productsRepository.findOneBy({ id })
        await this.productsRepository.delete({ id })
        return dataToDelete;


    }
    async updateImageProduct(id: string, url: string) {
        try {
            return await this.productsRepository.update({ id }, { imgUrl: url })
        } catch (error) {
            throw new Error(error)
        }
    }
}