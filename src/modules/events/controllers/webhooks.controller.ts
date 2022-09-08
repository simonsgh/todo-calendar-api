import { Body, Controller, Param, Post } from '@nestjs/common';

import { EventsService } from '../../db/services/events.service';
import { WebhooksService } from '../../db/services/webhooks.service';
import { CreateWebhookDTO } from '../../db/dto/create-webhook.dto';

@Controller('webhooks')
export class WebhooksController {
  constructor(private eventsService: EventsService, private webhooksService: WebhooksService) {}

  @Post(':path')
  async create(@Param() params, @Body() body: any): Promise<void> {
    const path = `/${params.path}`;
    const event = await this.eventsService.findOneByPath(path);
    if (!event) {
      return;
    }

    const createWebhookDTO = this.webhooksService.plainToInstance<CreateWebhookDTO>(
      CreateWebhookDTO,
      { path, body, date: new Date().toISOString(), color: event.color, name: event.name },
    );

    await this.webhooksService.create(createWebhookDTO);
  }
}
