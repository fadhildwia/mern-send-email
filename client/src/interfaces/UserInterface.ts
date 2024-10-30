export interface PostBodyLoginInterface {
  email: string;
  password: string;
}

export interface ResponseLoginInterface {
  user: PostBodyLoginInterface;
  token: string;
}