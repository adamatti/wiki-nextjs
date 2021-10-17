import type { NextApiRequest, NextApiResponse } from 'next';
import * as mongoRepo from '../../../src/mongoRepo';

const deleteHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const {name} = req.query;
    await mongoRepo.remove(name);
    res.status(200).json({});
}

const getHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const {name} = req.query;
    const entry = await mongoRepo.get(name);

    if (!entry.name) {
        return res.status(404).json({});
    }

    res.status(200)
        .setHeader("Content-Type", "application/json")
        .json(entry);
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {

    if (req.method === "DELETE") {
        return deleteHandler(req, res);
    }
    if (req.method === "GET") {
        return getHandler(req, res);
    }
    res.status(400).json({error: 'Method not supported'});
}