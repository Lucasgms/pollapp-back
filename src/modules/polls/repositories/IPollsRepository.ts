import ICreatePollDTO from '../dtos/ICreatePollDTO';
import Poll from '../infra/typeorm/entities/Poll';

export default interface IPollsRepository {
  create(data: ICreatePollDTO): Promise<Poll>;
  findById(id: string): Promise<Poll | undefined>;
  findByHash(hash: string): Promise<Poll | undefined>;
  findByOwnerId(owner_id: string): Promise<Poll[]>;
  save(poll: Poll): Promise<Poll>;
}
