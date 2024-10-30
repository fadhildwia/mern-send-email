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

export const getAll = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.MONGO_URL) as { userId: string };
    const emailSchedules = await EmailSchedule.find({ userId: decoded.userId });
    
    res.status(200).json(emailSchedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email schedules' });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const emailSchedule = await EmailSchedule.findById(id);
    
    if (!emailSchedule) {
      return res.status(404).json({ message: 'Email schedule not found' });
    }
    
    res.status(200).json(emailSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email schedule' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { recipientEmail, subject, content, scheduledDate } = req.body;

  try {
    const emailSchedule = await EmailSchedule.findById(id);
    
    if (!emailSchedule) {
      return res.status(404).json({ message: 'Email schedule not found' });
    }

    emailSchedule.recipientEmail = recipientEmail || emailSchedule.recipientEmail;
    emailSchedule.subject = subject || emailSchedule.subject;
    emailSchedule.content = content || emailSchedule.content;
    emailSchedule.scheduledDate = scheduledDate ? new Date(scheduledDate) : emailSchedule.scheduledDate;

    await emailSchedule.save();

    res.status(200).json(emailSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error updating email schedule' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const emailSchedule = await EmailSchedule.findByIdAndDelete(id);
    
    if (!emailSchedule) {
      return res.status(404).json({ message: 'Email schedule not found' });
    }

    res.status(200).json({ message: 'Email schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting email schedule' });
  }
};