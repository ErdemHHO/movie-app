import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dtos/CreateReview.dto';
import { AuthGuard } from 'src/strategies/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  @ApiTags('Review')
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiCreatedResponse({ status: 200, description: 'Reviews found' })
  getReviews() {
    return console.log('reviews');
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiTags('Review')
  @ApiOperation({ summary: 'Create a review' })
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }
}
