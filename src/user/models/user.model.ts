import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    toJSON: { getters: true, virtuals: true },
  },
})
export class UserModel {

  @prop({ type: String, required: true, trim: true, index: true })
  public username: string;

  @prop({ type: String, required: true, trim: true })
  public email: string;

  @prop({ type: String, trim: true })
  public displayName?: string;

  @prop({ type: String, trim: true })
  public firstName?: string;

  @prop({ type: String, trim: true })
  public lastName?: string;

  @prop({ type: Date, default: Date.now })
  public createdAt: Date;

  @prop({ type: String, trim: true })
  public createdBy: string;

  @prop({ type: Date, default: Date.now })
  public updatedAt: Date;

  @prop({ type: String, trim: true })
  public updatedBy: string;

}
