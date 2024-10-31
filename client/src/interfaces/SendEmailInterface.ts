export interface PostBodySendEmailInterface {
  recipientEmail: string;
  subject: string;
  content: string;
  scheduledDate: Date | string;
}

export interface PutBodyModifySendEmailInterface extends PostBodySendEmailInterface {
  id: string
}

export interface ResponseSendEmailInterface extends PostBodySendEmailInterface {
  userId: string;
  status: string;
  _id: string
}