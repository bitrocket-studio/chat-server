import { Request, Response } from 'express';
import { serviceRoomCreate, serviceRoomDelete, serviceRoomList } from './rooms.service';

export const controllerRoomCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.oidc.isAuthenticated()) res.status(401).json({ error: 'Unauthorized' });
    else {
      const room = await serviceRoomCreate(req.oidc.user.sid);
      res.status(201).json(room);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const controllerRoomList = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await serviceRoomList();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const controllerRoomDelete = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await serviceRoomDelete(id);
    res.status(200).json({ id: id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
