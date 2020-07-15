import { Router } from 'express';

import PublicPollsController from '../controllers/PublicPollsController';

const publicPollsRouter = Router();
const publicPollsController = new PublicPollsController();

publicPollsRouter.get('/:hash', publicPollsController.get);

export default publicPollsRouter;