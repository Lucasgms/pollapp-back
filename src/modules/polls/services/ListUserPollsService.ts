import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Poll from '../infra/typeorm/entities/Poll';
import IPollsRepository from '../repositories/IPollsRepository';
import ICreatePollDTO from '../dtos/ICreatePollDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IListPollsDTO {
  owner_id: string;
}

@injectable()
class createPollService {
  constructor(
    @inject('PollsRepository')
    private pollsRepository: IPollsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    owner_id,
  }: IListPollsDTO): Promise<Poll[]> {
    const pollOwner = this.usersRepository.findById(owner_id);

    if (!pollOwner) {
      throw new AppError('User does not exist');
    }

    const userPolls = await this.pollsRepository.findByOwnerId(owner_id);

    return userPolls;
  }
}
export default createPollService;