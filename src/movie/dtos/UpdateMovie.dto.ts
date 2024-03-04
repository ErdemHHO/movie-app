import { IsString, IsNumber } from 'class-validator';
export class UpdateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsNumber()
  categoryId: number;
}
