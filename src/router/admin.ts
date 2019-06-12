import {Router} from "express";
import {AdminController} from "../controller/AdminController";
const multer = require('multer');

const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.post('/hero', AdminController.addHero);

routes.post('/photo', upload.single('photo'), AdminController.addPhoto);

export default routes;