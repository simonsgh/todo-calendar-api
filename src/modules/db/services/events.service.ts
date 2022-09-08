import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Event, EventDocument } from '../schemas/event.schema';
import { CreateEventDTO } from '../dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createEventDTO: CreateEventDTO): Promise<Event> {
    let event = await this.findOneByPath(createEventDTO.path, null);
    if (event) {
      return this.update(event._id, createEventDTO);
    }

    event = await this.eventModel.create(createEventDTO);
    this.eventEmitter.emit('event.created');
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find({}, {}, { sort: { start: 1 } }).exec();
  }

  async findOneByPath(path: string, activeDate = new Date()): Promise<Event | null> {
    return this.eventModel
      .findOne({
        path,
        ...(activeDate && { start: { $lte: activeDate }, end: { $gte: activeDate } }),
      })
      .exec();
  }

  async update(id: string | ObjectId, createEventDTO: CreateEventDTO): Promise<Event> {
    const event = await this.eventModel.findByIdAndUpdate(id, createEventDTO, { new: true });
    this.eventEmitter.emit('event.updated');
    return event;
  }

  async delete(id: string | ObjectId): Promise<void> {
    await this.eventModel.findByIdAndDelete(id);
    this.eventEmitter.emit('event.deleted');
  }
}
