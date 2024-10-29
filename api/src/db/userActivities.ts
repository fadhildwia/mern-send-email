import mongoose from "mongoose";

interface IUserActivity extends mongoose.Document {
  userId: string;
  loginTimestamp?: Date;
  logoutTimestamp?: Date;
}

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  loginTimestamp: Date,
  logoutTimestamp: Date,
});

export const UserActivityModel = mongoose.model<IUserActivity>('user_activity', userActivitySchema);

export const createUserActivity = (values: Record<string, any>) => new UserActivityModel(values).save();