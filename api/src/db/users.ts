import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  loginTimestamp: Date,
  logoutTimestamp: Date
}

interface IUserActivity extends Document {
  userId: string;
  loginTimestamp?: Date;
  logoutTimestamp?: Date;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  loginTimestamp: Date,
  logoutTimestamp: Date
})

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  loginTimestamp: Date,
  logoutTimestamp: Date,
});

export const UserModel = mongoose.model<IUser>('user', UserSchema);
export const UserActivityModel = mongoose.model<IUserActivity>('user_activity', userActivitySchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save();
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const createUserActivity = (values: Record<string, any>) => new UserActivityModel(values).save();