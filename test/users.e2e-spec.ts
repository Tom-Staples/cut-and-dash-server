import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const users = [
  {
    id: '6477a052988711fc58ee5009',
    firstName: 'tony',
    lastName: 'stark',
    email: 'tony.stark@avengers.com',
    password: 'IAmIronMan2008!',
  },
  {
    id: '6477a26a988711fc58ee500b',
    firstName: 'steve',
    lastName: 'rodgers',
    email: 'steve.rodgerk@avengers.com',
    password: 'ICouldDoThisAllDay1920!',
  },
  {
    id: '6477a2a4988711fc58ee500d',
    firstName: 'peter',
    lastName: 'parker',
    email: 'peter.parker@avengers.com',
    password: 'UncleBen68!',
  },
];

class mockJwtAuthGuard {
  canActivate() {
    return true;
  }
}

const payload = {
  firstName: 'Steve',
  lastName: 'Rodgers',
  email: 'c.america@email.com',
  password: 'ICouldDoThisAllDay!18',
};
describe('UsersController (e2e)', () => {
  let app: INestApplication;

  describe('unauthorized requests', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });
    afterEach(async () => {
      await app.close();
    });
    test('getAllUsers returns 401 status', async () => {
      const response = await request(app.getHttpServer()).get('/users');
      expect(response.statusCode).toBe(401);
    });
    test('getSingleUser returns 401 status', async () => {
      const response = await request(app.getHttpServer()).get(
        '/users/ahdh9np93e4hp94',
      );
      expect(response.statusCode).toBe(401);
    });
    test('addUser returns 401 status', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(payload);
      expect(response.statusCode).toBe(401);
    });
    test('updateUser returns 401 status', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/ahdh9np93e4hp94')
        .send(payload);
      expect(response.statusCode).toBe(401);
    });
    test('deleteUser returns 401 status', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/users/ahdh9np93e4hp94',
      );
      expect(response.statusCode).toBe(401);
    });
  });

  describe('authorized requests', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(JwtAuthGuard)
        .useClass(mockJwtAuthGuard)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });
    afterEach(async () => {
      await app.close();
    });
    describe('getAllUsers', () => {
      test('returns status 200', async () => {
        const response = await request(app.getHttpServer()).get('/users');
        expect(response.statusCode).toBe(200);
      });
      test('returns JSON response', async () => {
        const response = await request(app.getHttpServer()).get('/users');
        expect(response.headers['content-type']).toEqual(
          'application/json; charset=utf-8',
        );
      });
      test('returns array of users', async () => {
        const response = await request(app.getHttpServer()).get('/users');
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(3);

        response.body.forEach((user) => {
          expect(user).toBeTruthy();
          expect(user._id).toBeTruthy();
          expect(user.firstName).toBeTruthy();
          expect(user.lastName).toBeTruthy();
          expect(user.email).toBeTruthy();
          expect(user.password).toBeTruthy();
        });
      });
    });
  });
});
