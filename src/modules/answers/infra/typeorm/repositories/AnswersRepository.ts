import { Repository, getRepository } from 'typeorm';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import Answer from '../entities/Answer';
import ICreateAnswerDTO from '@modules/answers/dtos/ICreateAnswerDTO';

class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>;

  constructor() {
    this.ormRepository = getRepository(Answer);
  }

  public async create(data: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.ormRepository.create(data);

    await this.ormRepository.save(answer);

    return answer;
  }
  
  public async findAllByPollId(poll_id: string): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: {poll_id},
    });

    return answers;
  }

  public async findAllByUserId(user_id: string): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: {user_id},
    });

    return answers;
  }

  public async save(answer: Answer): Promise<Answer> {
    return this.ormRepository.save(answer);
  }
}