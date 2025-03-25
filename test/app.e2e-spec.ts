import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { AuthGuard } from "../src/modules/auth/authGuard/auth.guard";
import { RoleGuard } from "../src/modules/auth/authGuard/role.guard";

import * as request from 'supertest';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(RoleGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Get /users should return 200 status code', async () => {
        const req = await request(app.getHttpServer()).get('/users');
        expect(req.status).toBe(200);
    })
  // se debe pasar un id valido de user
    it('Get(:id) should return 200 status code and a user', async () => {
        const req = await request(app.getHttpServer())
        .get('/users/c69507a6-143e-4f30-a3e5-32cd093ff4ff');
        expect(req.status).toBe(200);
        expect(req.body).toBeDefined();
        expect(req.body.email).toBeDefined();
    })

    it('Post /auth/signup should return 201 status code and create a user', async () => {
        const req = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ 
          name: 'John Doe',
          email: 'example2@example.com',
          password: 'Example123!',
          confirmPassword: 'Example123!',
          address: '123 Main St',
          city: 'New York',
          country: 'USA',
          phone: 123456789
        });
        expect(req.status).toBe(201);
        expect(req.body).toBeInstanceOf(Object);
        expect(req.body.email).toBeDefined();
    })
    it('Post /auth/signin should return 201 status code and logged in', async () => {
        const req = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ 
          email: 'example2@example.com',
          password: 'Example123!'
        });
        expect(req.status).toBe(201);
        expect(req.body).toBeInstanceOf(Object);
        expect(req.body.success).toBe(true);
    })
    it('Get /products should return 200 status code and a list of products', async () => {
        const req = await request(app.getHttpServer())
        .get('/products');
        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Array);
    })
})