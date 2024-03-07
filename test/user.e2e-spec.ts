import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '../src/user/entities/user.entity';
import { UserModule } from '../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../src/strategies/auth.guard';
import { RoleGuard } from '../src/strategies/role.guard';

describe('User e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [User],
          synchronize: true,
        }),
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should create a new user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        firstName: 'mock',
        lastName: 'mock',
        password: 'mock',
        confirmPassword: 'mock',
        email: 'erdem@mock.com',
        role: 'admin',
      })
      .expect(201);
  });

  it('should return an array of users', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });
});
