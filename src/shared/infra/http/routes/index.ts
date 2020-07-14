import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import pollsRouter from '@modules/polls/infra/http/routes/polls.routes';
import publicPollsRouter from '@modules/polls/infra/http/routes/public_polls.routes';
import answersRouter from '@modules/answers/infra/http/routes/answers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/polls', pollsRouter);
routes.use('/public-polls', publicPollsRouter);
routes.use('/answers', answersRouter);

export default routes;