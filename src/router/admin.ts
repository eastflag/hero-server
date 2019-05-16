import {Router} from "express";
import {AdminController} from "../controller/AdminController";

const routes = Router();

routes.post('/hero', AdminController.addHero);

export default routes;