import type { NextApiRequest, NextApiResponse } from 'next';
import { WikiEntry, ResponseError } from '../../../types';
import * as mongoRepo from '../../../mongoRepo';

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
  console.log("API: About to save", entry);
  await mongoRepo.save(entry);
  res.status(201)
    .setHeader('Content-Type', 'application/json')
    .json({});
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<WikiEntry[] | ResponseError>
  ) {
    if (req.method === 'GET') { 
      return getHandler(req,res);
    } 
    if (req.method === 'POST') { 
      return postHandler(req,res);
    }
    res.status(400).json({error: 'Method not supported'});
};  