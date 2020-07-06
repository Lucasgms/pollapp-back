import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Poll from '../infra/typeorm/entities/Poll';
import IPollsRepository from '../repositories/IPollsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface EditPollDTO {
  data: Poll,
  user_id: string,
  poll_id: string,
}

@injectable()
class createPollService {
  constructor(
    @inject('PollsRepository')
    private pollsRepository: IPollsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ data, user_id, poll_id }: EditPollDTO): Promise<Poll> {
    const pollOwner = this.usersRepository.findById(poll_id);

    if (!pollOwner) {
      throw new AppError('User does not exists');
    }

    const foundPoll = await this.pollsRepository.findById(poll_id);

    if (!foundPoll) {
      throw new AppError('Poll does not exists');
    }

    if (foundPoll.owner_id !== user_id) {
      throw new AppError('Unauthorized', 401);
    }

    const poll = await this.pollsRepository.save(data);

    return poll;
  }
}
export default createPollService;