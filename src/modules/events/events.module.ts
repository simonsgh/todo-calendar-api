import { Module } from '@nestjs/common';

import { DBModule } from '../db/db.module';
import { WebhooksController } from './controllers/webhooks.controller';
import { EventsGateway } from './gateways/events.gateway';

@Module({
  imports: [DBModule],
  controllers: [WebhooksController],
  providers: [EventsGateway],
})
export class EventsModule {
  constructor() {}
}
