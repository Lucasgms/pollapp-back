import { container } from 'tsyringe';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPollsRepository from '@modules/polls/repositories/IPollsRepository';
import PollsRepository from '@modules/polls/infra/typeorm/repositories/PollsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPollsRepository>(
  'PollsRepository',
  PollsRepository,
);