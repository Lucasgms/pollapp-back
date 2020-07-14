import ICreateAnswerDTO from "../dtos/ICreateAnswerDTO";
import Answer from "../infra/typeorm/entities/Answer";

export default interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>;
  findAllByPollId(poll_id: string): Promise<Answer[]>;
  findAllByUserId(user_id: string): Promise<Answer[]>;
  save(asnwer: Answer): Promise<Answer>;
}