import {Router} from 'express';
import {ScoreController} from "../controller/ScoreController";

const routes = Router();

routes.get('/list', ScoreController.getScores);
routes.post('', ScoreController.addScore);
routes.delete('', ScoreController.removeScore);

export default routes;