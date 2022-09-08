import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Webhook, WebhookDocument } from '../schemas/webhook.schema';
import { CreateWebhookDTO } from '../dto/create-webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectModel(Webhook.name)
    private webhookModel: Model<WebhookDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  plainToInstance<T>(cls: ClassConstructor<T>, plain: T): T {
    return plainToInstance<T, T>(cls, plain);
  }

  async create(createWebhookDTO: CreateWebhookDTO): Promise<Webhook> {
    const event = await this.webhookModel.create(createWebhookDTO);
    this.eventEmitter.emit('webhook.created');
    return event;
  }

  async findAll(): Promise<Webhook[]> {
    return this.webhookModel.find({}, {}, { sort: { date: 1 } }).exec();
  }
}
