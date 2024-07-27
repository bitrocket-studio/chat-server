import express, { Router } from 'express';
import { controllerRoomCreate, controllerRoomDelete, controllerRoomList } from './rooms.controller';
import { controllerMessageCreate, controllerMessageList } from '../messages/messages.controller';

const routerRooms = Router();

// routerRooms.use(middlewareAuth);
routerRooms.use(express.json());

routerRooms.get('/', controllerRoomList).post('/', controllerRoomCreate);
routerRooms.delete('/:id', controllerRoomDelete);

routerRooms.get('/:id/messages', controllerMessageList).post('/:id/messages', controllerMessageCreate);

export default routerRooms;
