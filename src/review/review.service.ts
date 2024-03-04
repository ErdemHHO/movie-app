import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateReviewDto } from './dtos/CreateReview.dto';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    private movieService: MovieService,
    private userService: UserService,

    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const movie = await this.movieRepository.findOneBy({
      id: createReviewDto.movieId,
    });

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      movie,
    });
    return await this.reviewRepository.save(review);
  }
}
