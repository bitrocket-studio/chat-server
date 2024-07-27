import { Request, Response } from 'express';
import { serviceMessageCreate, serviceMessageList } from './messages.service';

export const controllerMessageList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const messages = await serviceMessageList(id);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const controllerMessageCreate = async (req: Request, res: Response) => {
  const { content, username } = req.body;
  const { id } = req.params;
  try {
    const message = await serviceMessageCreate({ id_room: id, content, username });
    res.status(201).json(message);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
