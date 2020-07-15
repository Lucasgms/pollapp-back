import { Router } from 'express';

import AnswersController from '../controllers/AnswersController';

const answersRouter = Router();
const answersController = new AnswersController();

answersRouter.post('/', answersController.create);

export default answersRouter;