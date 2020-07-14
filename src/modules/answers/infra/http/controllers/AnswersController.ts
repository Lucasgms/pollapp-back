import { Request, Response } from 'express';

import CreateAnswerService from '@modules/answers/services/CreateAnswerService';
import { container } from 'tsyringe';

export default class AnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      poll_id,
      option,
    } = request.body;

    const { id: user_id } = request.user || null;

    const createAnswer = container.resolve(CreateAnswerService);

    const answer = await createAnswer.execute({
      poll_id,
      option,
      user_id,
    });

    return response.json(answer);
  }
}