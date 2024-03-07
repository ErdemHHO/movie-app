import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { CategoryModule } from './category/category.module';
import postgres from 'postgres';
import { MovieModule } from './movie/movie.module';
import { Category } from './category/entities/category.entity';
import { Movie } from './movie/entities/movie.entity';
import { Review } from './review/entities/review.entity';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { GenericResponseErrMsg } from './user/generic-response-err-msg.exception';

@Module({
  imports: [
    HttpModule,
    UserModule,
    AuthModule,
    MovieModule,
    CategoryModule,
    ReviewModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      schema: 'public',
      entities: [User, Category, Movie, Review],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GenericResponseErrMsg,
    },
  ],
})
export class AppModule {}
