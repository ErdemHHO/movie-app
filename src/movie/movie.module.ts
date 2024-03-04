import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { Movie } from "./entities/movie.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "src/category/category.service";
import { CategoryModule } from "src/category/category.module";
import { Category } from "src/category/entities/category.entity";


@Module({
    imports: [ TypeOrmModule.forFeature([Movie,Category]),CategoryModule ],
    providers: [MovieService,CategoryService],
    controllers: [MovieController],
    exports: [MovieService],
})
export class MovieModule {}