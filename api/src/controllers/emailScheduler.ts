import { getUserById } from "../db/users";
import { transporter } from "../config/nodemailer";
import { EmailSchedule } from "../db/emailScheduler";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const create = async (req: Request, res: Response) => {
  const { recipientEmail, subject, content, scheduledDate } = req.body;
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.MONGO_URL) as { userId: string };
    const user = await getUserById(decoded.userId)

    const emailSchedule = new EmailSchedule({
      userId: user._id,
      recipientEmail,
      subject,
      content,
      scheduledDate: new Date(scheduledDate),
    });

    await emailSchedule.save();

    try {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: recipientEmail,
        subject,
        text: content,
        date: new Date(scheduledDate)
      });

      await EmailSchedule.findByIdAndUpdate(emailSchedule._id, {
        status: 'sent'
      });
    } catch (error) {
      await EmailSchedule.findByIdAndUpdate(emailSchedule._id, {
        status: 'failed'
      });
    }

    return res.status(201).json(emailSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating email schedule' });
  }
}