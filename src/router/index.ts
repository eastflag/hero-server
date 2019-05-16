import {Router} from "express";
import user from './user';
import admin from './admin';

const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);

export default routes;