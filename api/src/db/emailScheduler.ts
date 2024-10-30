import mongoose from "mongoose";

interface IEmailSchedule extends mongoose.Document {
  userId: string,
  recipientEmail: string;
  subject: string;
  content: string;
  scheduledDate: Date;
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const EmailScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  recipientEmail: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true, default: 'Hi Salam kenal' },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
}, { timestamps: true });

export const EmailSchedule = mongoose.model<IEmailSchedule>('email_schedule', EmailScheduleSchema);