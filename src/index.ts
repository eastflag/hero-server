import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {Photo} from "./entity/Photo";

const app = express();

createConnection(/*...*/).then(async connection => {

  let photo = new Photo();
  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-with-bears.jpg";
  photo.views = 1;
  photo.isPublished = true;

  await connection.manager.save(photo);
  console.log("Photo has been saved");

  // start express server --------------------------------
  app.use(bodyParser());

  app.use('/api', router);

  app.listen(8000, () => {
    console.log('server is listening 8000');
  });

}).catch(error => console.log(error));

