import { injectable, inject } from 'tsyringe';
import IAnswersRepository from '../repositories/IAnswersRepository';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';
import Answer from '../infra/typeorm/entities/Answer';
import IPollsRepository from '@modules/polls/repositories/IPollsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPollOptionsDTO from '@modules/polls/dtos/IPollOptionsDTO';
import IPollOptionDTO from '@modules/polls/dtos/IPollOptionDTO';


@injectable()
class CreateAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,

    @inject('PollsRepository')
    private pollsRepository: IPollsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ poll_id, user_id, option }: ICreateAnswerDTO): Promise<Answer> {
    if (user_id) {
      const foundUser = await this.usersRepository.findById(user_id);

      if (!foundUser) {
        throw new AppError('User does not exist', 401);
      }
    }

    const foundPoll = await this.pollsRepository.findById(poll_id);

    if (!foundPoll) {
      throw new AppError('Poll does not exist', 401);
    }

    const pollOptions = foundPoll.options as Object;
    const options = pollOptions as IPollOptionsDTO;

    const foundOption = options.options.find((optionItem: IPollOptionDTO) => optionItem.id === option);

    if (!foundOption) {
      throw new AppError('Option does not exist in this poll', 401);
    }

    const answer = await this.answersRepository.create({
      poll_id,
      user_id,
      option,
    });

    return answer;
  }
}

export default CreateAnswerService;