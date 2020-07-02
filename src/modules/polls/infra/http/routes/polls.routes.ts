import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PollsController from '../controllers/PollsController';

const pollsRouter = Router();
const pollsController = new PollsController();

pollsRouter.use(ensureAuthenticated);

pollsRouter.post('/', pollsController.create);

export default pollsRouter;