import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
  Query,
  Put,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/CreateMovie.dto';
import { UpdateMovieDto } from './dtos/UpdateMovie.dto';
import { AuthGuard } from 'src/strategies/auth.guard';
import { RoleGuard } from 'src/strategies/role.guard';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Get all movies' })
  @ApiCreatedResponse({ status: 200, description: 'Movies found' })
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get('/:id')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiCreatedResponse({ status: 200, description: 'Movie found' })
  getMovie(@Param('id') id: number) {
    return this.movieService.getMovieById(id);
  }

  @Get('/title/:title')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Get movie by title' })
  @ApiCreatedResponse({ status: 200, description: 'Movie found' })
  getMovieByTitle(@Param('title') title: string) {
    return this.movieService.getMovieByTitle(title);
  }

  @Get('/search/searchTerm')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Search movies by title or description' })
  @ApiCreatedResponse({ status: 200, description: 'Movies found' })
  searchMovies(@Query('q') searchTerm: string) {
    return this.movieService.getMoviesByTitleOrDescription(searchTerm);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Create a movie' })
  @ApiCreatedResponse({ status: 201, description: 'Movie created' })
  @SetMetadata('roles', ['admin'])
  createMovie(@Body(new ValidationPipe()) createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get('/category/:category')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Get movie by category' })
  @ApiCreatedResponse({ status: 200, description: 'Movie found' })
  findMovieByCategory(@Param('category') categoryId: number) {
    return this.movieService.findMovieByCategory(categoryId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Put('/:id')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Update movie' })
  @ApiCreatedResponse({ status: 200, description: 'Movie updated' })
  @SetMetadata('roles', ['admin'])
  updateMovie(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:id')
  @ApiTags('Movie')
  @ApiOperation({ summary: 'Delete movie' })
  @ApiCreatedResponse({ status: 200, description: 'Movie deleted' })
  @SetMetadata('roles', ['admin'])
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }
}
