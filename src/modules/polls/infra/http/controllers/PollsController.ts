import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePollService from '@modules/polls/services/CreatePollService';
import ListUserPollsService from '@modules/polls/services/ListUserPollsService';

export default class PollsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      options,
      is_public,
      owner_id,
    } = request.body;

    const createPoll = container.resolve(CreatePollService);

    const poll = await createPoll.execute({
      title,
      description,
      options,
      is_public,
      owner_id,
    });

    return response.json(poll);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPolls = container.resolve(ListUserPollsService);
    const { id: owner_id  } = request.user;

    const polls = await listPolls.execute({
      owner_id,
    });

    return response.json(polls);
  }
}