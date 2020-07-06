import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePollService from '@modules/polls/services/CreatePollService';
import ListUserPollsService from '@modules/polls/services/ListUserPollsService';
import GetPollDetailsService from '@modules/polls/services/GetPollDetailsService';

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

  public async get(request: Request, response: Response): Promise<Response> {
    const getPoll = container.resolve(GetPollDetailsService);
    const { id: owner_id  } = request.user;
    const { id } = request.params;

    const polls = await getPoll.execute({
      owner_id,
      poll_id: id,
    });

    return response.json(polls);
  }
}