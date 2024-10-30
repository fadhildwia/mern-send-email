import { isAuthenticated } from '../middlewares';
import { create } from '../controllers/emailScheduler';
import express, { NextFunction, Request, Response } from 'express'


export default (router: express.Router) => {
  router.post('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    create(req, res);
  });
};