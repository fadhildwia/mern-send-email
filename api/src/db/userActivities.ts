import mongoose from "mongoose";

interface IUserActivity extends mongoose.Document {
  userId: string;
  loginAt?: Date;
  logoutAt?: Date;
}

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  loginAt: Date,
  logoutAt: Date,
});

export const UserActivityModel = mongoose.model<IUserActivity>('user_activity', userActivitySchema);

export const createUserActivity = (values: Record<string, any>) => new UserActivityModel(values).save();