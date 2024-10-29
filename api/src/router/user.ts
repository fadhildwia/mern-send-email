import { isAuthenticated } from '../middlewares';
import express, { NextFunction, Request, Response } from 'express'
import { getUser } from '../controllers/users';


export default (router: express.Router) => {
  router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
      getUser(req, res)
  });
};