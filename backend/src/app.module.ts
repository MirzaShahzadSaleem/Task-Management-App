import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { EventsLogModule } from './events-log/events-log.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin1234',
      database: 'task_management',
      synchronize: true,
      autoLoadEntities: true,
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/2013'),

    UsersModule,
    AuthModule,
    TasksModule,
    EventsLogModule,
    EventsModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
