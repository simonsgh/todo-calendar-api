import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

@Schema()
export class Webhook {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, index: true })
  path: string;

  @Prop({ type: SchemaTypes.Mixed })
  body: Object;
}

export type WebhookDocument = Webhook & Document;
export const WebhookSchema = SchemaFactory.createForClass(Webhook);
