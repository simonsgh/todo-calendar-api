import { UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Server, Socket, ServerOptions } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { EventsService } from '../../db/services/events.service';
import { Event } from '../../db/schemas/event.schema';
import { CreateEventDTO } from '../../db/dto/create-event.dto';

import { AuthGuard } from '../guards/auth.guard';
import { WebhooksService } from '../../db/services/webhooks.service';

const serverOptions: Partial<ServerOptions> = {
  cors: { origin: '*' },
  transports: ['websocket'],
};

@UseGuards(AuthGuard)
@WebSocketGateway(serverOptions)
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  constructor(private eventsService: EventsService, private webhooksService: WebhooksService) {}

  async handleConnection(socket: Socket) {
    const events = await this.eventsService.findAll();
    socket.emit('events', events);

    const webhooks = await this.webhooksService.findAll();
    socket.emit('webhooks', webhooks);
  }

  @OnEvent('event.*')
  async handleEvents() {
    const events = await this.eventsService.findAll();
    this.server.emit('events', events);
  }

  @OnEvent('webhook.*')
  async handleWebhooks() {
    const webhooks = await this.webhooksService.findAll();
    this.server.emit('webhooks', webhooks);
  }

  @SubscribeMessage('events.create')
  async onEventsCreate(@MessageBody() data: CreateEventDTO): Promise<Event> {
    return this.eventsService.create(data);
  }

  @SubscribeMessage('events.delete')
  async onEventsDelete(@MessageBody() data: any): Promise<void> {
    return this.eventsService.delete(data.id);
  }
}
