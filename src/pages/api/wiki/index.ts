import type { NextApiRequest, NextApiResponse } from 'next';
import { WikiEntry, ResponseError } from '../../../types';
import * as mongoRepo from '../../../mongoRepo';
import withSession, {isLoggedIn} from "../../../lib/session";
import {default as loggerParent} from "../../../logger";
const logger = loggerParent.child({file: 'wikiApi'});

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<WikiEntry[]>
) => {
  const list = await mongoRepo.list();

  res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json(list);
}

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const entry = req.body;
  logger.debug("API: About to save", entry);
  await mongoRepo.save(entry);
  res.status(201)
    .setHeader('Content-Type', 'application/json')
    .json({});
}

export default withSession((
    req: NextApiRequest,
    res: NextApiResponse<WikiEntry[] | ResponseError>
  ) => {
    if (!isLoggedIn(req)){
      return res.status(401).json({error: "Not logged in"});
    }

    if (req.method === 'GET') { 
      return getHandler(req,res);
    } 
    if (req.method === 'POST') { 
      return postHandler(req,res);
    }
    res.status(400).json({error: 'Method not supported'});
});  