import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Poll from '../infra/typeorm/entities/Poll';
import IPollsRepository from '../repositories/IPollsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IListPollsDTO {
  owner_id: string;
  poll_id: string;
}

@injectable()
class getPollDetailsService {
  constructor(
    @inject('PollsRepository')
    private pollsRepository: IPollsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    owner_id,
    poll_id,
  }: IListPollsDTO): Promise<Poll> {
    const pollOwner = this.usersRepository.findById(owner_id);

    if (!pollOwner) {
      throw new AppError('User does not exists');
    }

    const poll = await this.pollsRepository.findById(poll_id);

    if (!poll) {
      throw new AppError('Poll does not exists');
    }

    if (poll.owner_id !== owner_id) {
      throw new AppError('Unauthorized', 401);
    }

    return poll;
  }
}
export default getPollDetailsService;