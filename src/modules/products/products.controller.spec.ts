import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Products } from "./products.entity";
import { AuthGuard } from "../auth/authGuard/auth.guard";
import { RoleGuard } from "../auth/authGuard/role.guard";

describe("productsController", () => {
    let productsController: Partial<ProductController>;

    let mockProductService: Partial<ProductService>;

    const mockProducts: Partial<Products[]> = [{
        id: "123e4567-e89b-12d3-a456-426655440000",
        description: 'description',
        imgUrl: 'https://via.placeholder.com/300',
        name: 'name',
        price: 1000,
        stock: 10,
        category: {
            id: '123e4567-e89b-12d3-a456-426655440000',
            name: 'category',
            products: [],
        },
        OrderDetails: [],
    }]

    beforeEach(async () => {
        mockProductService = {
            getProducts: () => Promise.resolve(mockProducts),
            getPruductsById: (id: string) => {
                const product = mockProducts.find(e => e.id == id);
                if (!product) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(product);
            },
            deleteProduct: (id: string) => {
                const index = mockProducts.findIndex(e => e.id == id);
                if (index == -1) {
                    return Promise.resolve(null);
                }
                const [deletedProduct] = mockProducts.splice(index, 1);
                return Promise.resolve(deletedProduct);
            }

        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                { provide: ProductService, useValue: mockProductService },
            ]
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(RoleGuard)
            .useValue({ canActivate: () => true })
            .compile();
        productsController = module.get<ProductController>(ProductController);
    });
    it('should be defined', () => {
        expect(productsController).toBeDefined();
    });

    it('getProducts should return an array of users', async () => {
        const result = await productsController.getProducts();
        expect(result).toEqual(mockProducts);
    });
    it('getProductsById should return a user whit id', async () => {
        const result = await productsController.getProductsById("123e4567-e89b-12d3-a456-426655440000");
        expect(result).toEqual(mockProducts[0]);
    })
    it('getProductsById should return null if id is incorrect', async () => {
        const result = await productsController.getProductsById("incorrect-id");
        expect(result).toBeNull();
    });
    it('deleteProduct should delete a user whit id', async () => {
        const result = await productsController.deleteProduct("123e4567-e89b-12d3-a456-426655440000");
        expect(mockProducts.length).toEqual(0);
    })
    it('deleteProduct should return null if id is incorrect', async () => {
        const result = await productsController.deleteProduct("incorrect-id");
        expect(result).toBeNull();
    })
});