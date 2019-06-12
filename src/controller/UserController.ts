import {getConnection} from "typeorm";
import {Hero} from "../entity/Hero";
import {ResultVo} from "../vo/ResultVo";

export class UserController {
  static getHeroes = async (req, res) => {
    // pagination
    const {start_index, page_size} = req.query;

    const options = {};
    options['select'] = ["id", "name", "email", "photo"];
    options['order'] = {id: 'desc'};
    if (start_index) {
      options['skip'] = start_index;
    }
    if (page_size) {
      options['take'] = page_size;
    }

    options['select'] = ["id", "name", "email", "photo"];

    const heroes = await getConnection().getRepository(Hero).find(options);

    const total = await getConnection().getRepository(Hero).count();

    const result = new ResultVo(0, "success");
    result.data = heroes;
    result.total = total;
    res.send(result);
  }

  static getHero = async (req, res) => {
    console.log(req.params);
    const {id} = req.params;

    const options = {relations: ["powers"], where: [{id}], take: 1};

    const hero = await getConnection().getRepository(Hero).find(options);
    res.send(hero);
  }
}