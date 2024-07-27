import { Request, Response, NextFunction } from 'express';

export const middlewareAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const apiKey = authHeader && authHeader.split(' ')[1];
  console.log('API key:', apiKey);

  if (!apiKey) res.status(401).json({ message: 'No API key provided' });
  else if (apiKey === process.env.API_KEY) next();
  else res.status(401).json({ message: 'Unauthorized' });
};
