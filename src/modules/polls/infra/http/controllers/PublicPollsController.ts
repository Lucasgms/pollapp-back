import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPublicPollService from '@modules/polls/services/GetPublicPollService';

export default class PublicPollsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const getPoll = container.resolve(GetPublicPollService);
    const { hash } = request.params;

    const polls = await getPoll.execute({
      hash
    });

    return response.json(polls);
  }
}