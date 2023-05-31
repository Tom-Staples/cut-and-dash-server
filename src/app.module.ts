import { Module, Logger, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_TEST_URI
        : process.env.MONGODB_URI,
      {
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            Logger.log('DB Connected');
          }
          connection.on('disconnected', () => {
            Logger.log('DB disconnected');
          });
          connection.on('error', (error) => {
            Logger.error(`DB connection failed. Error: ${error}`);
          });
          return connection;
        },
      },
    ),
    UsersModule,
    AuthModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    JwtAuthGuard,
  ],
})
export class AppModule {}
