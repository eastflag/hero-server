import {Router} from 'express';
import {UserController} from "../controller/UserController";

const routes = Router();

routes.get('/heroes', UserController.getHeroes);

export default routes;