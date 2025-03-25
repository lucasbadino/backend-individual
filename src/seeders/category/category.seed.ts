import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "../../modules/categories/categories.entity";
import { In, Repository } from "typeorm";
import { data } from "../data";

@Injectable()
export class CategorySeed {
    constructor(
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>
    ) { }

    async preloadCategories() {
        const dataCategories = data.map(product => product.category);
        const existsCategories = await this.categoryRepository.find({
            where: {
                name: In(dataCategories)
            }
        });
        for (const product of data) {
            const existCategory = existsCategories.some(e => e.name == product.category);
            if (!existCategory) {
                const category = new Categories()
                category.name = product.category;
                await this.categoryRepository.save(category);
                existsCategories.push(category);
            }
        };

    }

}