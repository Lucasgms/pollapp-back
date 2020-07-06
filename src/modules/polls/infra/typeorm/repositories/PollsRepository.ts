import { getRepository, Repository } from 'typeorm';

import IPollsRepository from '@modules/polls/repositories/IPollsRepository';
import ICreatePollDTO from '@modules/polls/dtos/ICreatePollDTO';

import Poll from '../entities/Poll';

class PollsRepository implements IPollsRepository {
  private ormRepository: Repository<Poll>;

  constructor() {
    this.ormRepository = getRepository(Poll);
  }

  public async create(data: ICreatePollDTO): Promise<Poll> {
    const poll = this.ormRepository.create(data);

    await this.ormRepository.save(poll);

    return poll;
  }

  public async findById(id: string): Promise<Poll | undefined> {
    const poll = await this.ormRepository.findOne(id);

    return poll;
  }

  public async findByHash(hash: string): Promise<Poll | undefined> {
    const poll = await this.ormRepository.findOne({
      where: { hash },
    });
    
    return poll;
  }

  public async findByOwnerId(owner_id: string): Promise<Poll[]> {
    const polls = await this.ormRepository.find({
      where: { owner_id },
    });

    return polls;
  }

  public async save(poll: Poll): Promise<Poll> {
    return this.ormRepository.save(poll);
  }
}

export default PollsRepository;