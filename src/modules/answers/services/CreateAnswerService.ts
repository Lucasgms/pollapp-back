import { injectable, inject } from 'tsyringe';
import IAnswersRepository from '../repositories/IAnswersRepository';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';
import Answer from '../infra/typeorm/entities/Answer';

@injectable()
class CreateAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  public async execute({ poll_id, user_id, option }: ICreateAnswerDTO): Promise<Answer> {
    const answer = await this.answersRepository.create({
      poll_id,
      user_id,
      option,
    });

    return answer;
  }
}

export default CreateAnswerService;