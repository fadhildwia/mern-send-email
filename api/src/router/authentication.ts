import { register } from '../controllers/authentication';
import express, { Request, Response } from 'express'


export default (router: express.Router) => {
  router.post('/auth/register', (req: Request, res: Response) => {
    register(req, res);
  });
};