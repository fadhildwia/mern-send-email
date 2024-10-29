import { login, logout, register } from '../controllers/authentication';
import express, { Request, Response } from 'express'


export default (router: express.Router) => {
  router.post('/auth/register', (req: Request, res: Response) => {
    register(req, res);
  });
  router.post('/auth/login', (req: Request, res: Response) => {
    login(req, res);
  });
  router.post('/auth/logout', (req: Request, res: Response) => {
    logout(req, res);
  });
};