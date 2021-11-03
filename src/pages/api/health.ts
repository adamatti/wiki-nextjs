import type { NextApiRequest, NextApiResponse } from 'next'
import * as mongoRepo from '../../mongoRepo'

type MongoHealth = {
    status: 'ok' | 'error',
    count?: number
}

type HealthResponse = {
    status: string
    mongo: MongoHealth
}

const mongoHealth = async ():Promise<MongoHealth> => {
    try {
        const count = await mongoRepo.count()
        return {
            status: 'ok',
            count
        }
    } catch (error) {
        return {
            status: 'error'
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HealthResponse>
  ) {
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ 
          status: 'ok',
          mongo: await mongoHealth(),
    })
  }