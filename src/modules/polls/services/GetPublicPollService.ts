import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Poll from '../infra/typeorm/entities/Poll';
import IPollsRepository from '../repositories/IPollsRepository';

interface IListPollsDTO {
  hash: string;
}

@injectable()
class getPublicPollService {
  constructor(
    @inject('PollsRepository')
    private pollsRepository: IPollsRepository
  ) {}

  public async execute({
    hash,
  }: IListPollsDTO): Promise<Poll> {
    const poll = await this.pollsRepository.findByHash(hash);

    if (!poll) {
      throw new AppError('Poll does not exists', 404);
    }

    return poll;
  }
}
export default getPublicPollService;