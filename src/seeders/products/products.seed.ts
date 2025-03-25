import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../../modules/products/products.entity"; 
import { In, Repository } from "typeorm";
import { data } from "../data";
import { Categories } from "../../modules/categories/categories.entity"; 

@Injectable()
export class ProductsSeed {

    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>
    ) { }

    async findCategory(category: string): Promise<Categories> {

        const categoryEntity = await this.categoryRepository.findOne({
            where: {
                name: category
            }
        });
        if (!categoryEntity) {
            const categoryEntity = new Categories();
            categoryEntity.name = category;
            await this.categoryRepository.save(categoryEntity);
            return categoryEntity;
        }

        return categoryEntity;

    }
    async preloadProducts() {

        const existsProducts = await this.productsRepository.find({
            where: {
                name: In(data.map(product => product.name))
            }
        });
        const products = data.map(async product => {
            const existProduct = existsProducts.find(e => e.name == product.name);
            if (!existProduct) {
                const productEntity = this.productsRepository.create({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                });
                productEntity.category = await this.findCategory(product.category);
                this.productsRepository.save(productEntity);
            }

        });

    }
}