import { Request, Response } from 'express';
import { getPlacesByName } from './SearchController';

export default [
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("TEST");
    }
  },
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q);
        res.status(200).send(result);
      }
    ]
  }
];
