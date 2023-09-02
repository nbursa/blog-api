import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BlogModule } from '../src/api/blog/blog.module';

describe('BlogController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BlogModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/blogs (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/blogs')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should return all blog posts when GET /blog', () => {
    const expectedBlogList = [
      { id: '1', title: 'Title1', content: 'Content1' },
      { id: '2', title: 'Title2', content: 'Content2' },
    ];

    return request(app.getHttpServer())
      .get('/blog')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expectedBlogList);
      });
  });
});
