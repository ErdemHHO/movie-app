import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { HttpModule } from "@nestjs/axios";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    HttpModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: "postgres",
      password: "123",
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
