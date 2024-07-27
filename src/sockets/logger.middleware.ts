import { Request, Response, NextFunction } from 'express';

export const middlewareLogger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};
