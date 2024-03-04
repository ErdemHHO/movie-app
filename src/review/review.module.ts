import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { Review } from './entities/review.entity';
import { MovieModule } from 'src/movie/movie.module';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserModule } from 'src/user/user.module';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Movie, User]),
    MovieModule,
    UserModule,
    CategoryModule,
  ],
  providers: [ReviewService, MovieService, UserService],
  controllers: [ReviewController],
})
export class ReviewModule {}
