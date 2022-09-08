import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventsModule } from '../events/events.module';

import { validateConfig } from './validations/env.validation';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true }),
    ConfigModule.forRoot({
      cache: true,
      validate: validateConfig,
      load: [appConfig, dbConfig],
    }),
    EventsModule,
  ],
})
export class AppModule {
  constructor() {}
}
