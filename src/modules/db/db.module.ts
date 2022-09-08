import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import dbConnectionFactory from './config/db-connection.factory';
import { EventsService } from './services/events.service';
import { WebhooksService } from './services/webhooks.service';
import { Event, EventSchema } from './schemas/event.schema';
import { Webhook, WebhookSchema } from './schemas/webhook.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dbConnectionFactory,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Webhook.name, schema: WebhookSchema },
    ]),
  ],
  providers: [EventsService, WebhooksService],
  exports: [EventsService, WebhooksService],
})
export class DBModule {
  constructor() {}
}
