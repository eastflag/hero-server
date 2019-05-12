import {Router} from 'express';

const routes = Router();

routes.get('/heroes', (req, res) => {
  res.send('heroes list');
});

export default routes;