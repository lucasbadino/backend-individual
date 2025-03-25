import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorySeed } from './seeders/category/category.seed';
import { ProductsSeed } from './seeders/products/products.seed';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { config as auth0Config } from './config/auth0.config'
import { auth } from 'express-openid-connect';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seeders/users/users.seed';
import { LoggerInterceptor } from './interceptors/logger.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((e) => {
          return {
            property: e.property,
            constraints: e.constraints,
          }
        });
        return new BadRequestException({
          alert: 'Se han encontrado los siguientes errores : ',
          errors: cleanErrors
        });
      }
    })
  )
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const categorySeed = app.get(CategorySeed);
  categorySeed.preloadCategories();
  console.log("preloaded categories");
  const productsSeed = app.get(ProductsSeed);
  productsSeed.preloadProducts();
  console.log("preloaded products");
  const usersSeed = app.get(UsersSeed);
  await usersSeed.preloadUsers()
  console.log("preloaded users",);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('New Ecommerce API')
    .addBearerAuth()
    .setDescription('Ecommerce API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


}
bootstrap();
