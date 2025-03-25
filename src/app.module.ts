import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import { ProductModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresConfig } from './config/data-source'
import { SeedsModule } from './seeders/seeds.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    AuthModule,
    OrdersModule,
    UserModule,
    ProductModule,
    SeedsModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    CloudinaryModule,
  ],
  controllers: [],
})
export class AppModule { }
