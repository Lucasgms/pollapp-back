import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Poll from '../infra/typeorm/entities/Poll';
import IPollsRepository from '../repositories/IPollsRepository';
import ICreatePollDTO from '../dtos/ICreatePollDTO';

@injectable()
class createPollService {
  constructor(
    @inject('PollsRepository')
    private pollsRepository: IPollsRepository
  ) {}

  public async execute({
    title,
    description,
    options,
    is_public,
    owner_id,
  }: ICreatePollDTO): Promise<Poll> {
    const poll = await this.pollsRepository.create({
      title,
      description,
      options,
      is_public,
      owner_id,
    });

    return poll;
  }
}
export default createPollService;