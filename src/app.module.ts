import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
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
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
