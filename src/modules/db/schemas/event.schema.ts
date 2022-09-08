import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, ObjectId } from 'mongoose';

@Schema()
export class Event {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  color: string;

  @Prop({ index: true, unique: true })
  path: string;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
