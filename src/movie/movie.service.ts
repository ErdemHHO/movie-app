import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/CreateMovie.dto';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { UpdateMovieDto } from './dtos/UpdateMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    private categoryService: CategoryService,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getMovies() {
    return await this.movieRepository.find({
      relations: ['category', 'reviews'],
    });
  }

  async getMovieById(id: number) {
    const findMovie = await this.movieRepository.findOneBy({ id: id });

    if (!findMovie) {
      throw new BadRequestException('Movie not found');
    }

    return findMovie;
  }

  async getMovieByTitle(title: string) {
    const movies = await this.movieRepository.find({
      where: {
        title: title,
      },
    });

    if (!movies) {
      throw new BadRequestException('Movie not found');
    }
    return movies;
  }

  async getMoviesByTitleOrDescription(searchTerm: string) {
    const searchQuery: FindManyOptions<Movie> = {
      where: [
        { title: Like(`%${searchTerm}%`) },
        { description: Like(`%${searchTerm}%`) },
      ],
    };

    const movies = await this.movieRepository.find(searchQuery);

    if (!movies || movies.length === 0) {
      throw new BadRequestException('Movies not found');
    }

    return movies;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const category = await this.categoryService.findOne(
      createMovieDto.categoryId,
    );
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const existingMovie = await this.movieRepository.findOne({
      where: { title: createMovieDto.title },
    });
    if (existingMovie) {
      throw new BadRequestException('Movie already exists');
    }

    const movie = new Movie();
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.image_url = createMovieDto.image_url;
    movie.category = category;

    return await this.movieRepository.save(movie);
  }

  async findMovieByCategory(categoryId: number) {
    const findCategory = await this.categoryService.findOne(categoryId);

    if (!findCategory) {
      throw new BadRequestException('Category not found');
    }

    const findMovie = await this.movieRepository.find({
      where: { category: findCategory },
    });

    if (!findMovie) {
      throw new BadRequestException('Movie not found');
    }

    return findMovie;
  }

  async findMovieByQuery(categoryId: number, title: string) {
    const findCategory = await this.categoryService.findOne(categoryId);

    if (!findCategory) {
      throw new BadRequestException('Category not found');
    }

    const findMovie = await this.movieRepository.find({
      where: { category: findCategory, title: title },
    });

    if (!findMovie) {
      throw new BadRequestException('Movie not found');
    }

    return findMovie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOneBy({ id: id });

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    const category = await this.categoryService.findOne(
      updateMovieDto.categoryId,
    );
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    movie.title = updateMovieDto.title;
    movie.description = updateMovieDto.description;
    movie.image_url = updateMovieDto.image_url;
    movie.category = category;

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOneBy({ id: id });

    if (!movie) {
      throw new BadRequestException('Movie not found');
    }

    return await this.movieRepository.remove(movie);
  }
}
