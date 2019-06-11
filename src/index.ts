import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {Power} from "./entity/Power";
import {Hero} from "./entity/Hero";

const app = express();

createConnection(/*...*/).then(async connection => {

  // test data -------------------------------------------------------------------------------------------------------
  console.log("Inserting a new hero into the database...");

  let power1 = new Power();
  power1.name = "strength";
  await connection.manager.save(power1);
  let power2 = new Power();
  power2.name = "flying";
  await connection.manager.save(power2);

  const hero = new Hero();
  hero.name = "Superman";
  hero.email = "superman@gmail.com";
  hero.sex = "male";
  hero.country = "American";
  hero.address = "NewYork";
  hero.powers= [power1, power2];
  await connection.manager.save(hero);

  // const findHero = await connection.manager.find(Hero);
  const result = await connection.getRepository(Hero).find({relations: ["powers"]});
  console.log("Loaded findHero: ", result);

  console.log("Here you can setup and run express/koa/any other framework.");

  // start express server --------------------------------
  app.use(bodyParser());

  app.use('/api', router);

  app.listen(8000, () => {
    console.log('server is listening 8000');
  });

}).catch(error => console.log(error));

