import {Router} from "express";
import user from './user';
import admin from './admin';
import score from "./score";

const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);
routes.use('/score', score);

export default routes;