import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  loginAt: Date,
  logoutAt: Date
}

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  loginAt: Date,
  logoutAt: Date
})


export const UserModel = mongoose.model<IUser>('user', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save();
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
