import express from 'express';
import authentication from './authentication';
import user from './user';
import emailScheduler from './emailScheduler';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  emailScheduler(router);
  return router;
};