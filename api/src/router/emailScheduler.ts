import { isAuthenticated } from '../middlewares';
import { create, getAll, getById, remove, update } from '../controllers/emailScheduler';
import express, { NextFunction, Request, Response } from 'express'


export default (router: express.Router) => {
  router.post('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    create(req, res);
  });
  router.get('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    getAll(req, res);
  });
  router.get('/sendEmail/:id', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    getById(req, res);
  });
  router.put('/sendEmail/:id', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    update(req, res);
  });
  router.delete('/sendEmail/:id', (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, next)}, (req: Request, res: Response) => {
    remove(req, res);
  });
};