import {Router} from 'express';
import {UserController} from "../controller/UserController";

const routes = Router();

routes.get('/heroes', UserController.getHeroes);

routes.get('/hero/:id([0-9]+)', UserController.getHero);

export default routes;