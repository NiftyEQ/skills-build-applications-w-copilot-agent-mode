import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter(model: Model<unknown>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      const records = await model.find().lean();
      response.json(records);
    } catch {
      response.status(500).json({ error: 'Unable to load resource data' });
    }
  });

  return router;
}
