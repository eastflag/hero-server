import {Hero} from "../entity/Hero";
import {getConnection} from "typeorm";
import {Power} from "../entity/Power";
import {ResultVo} from "../vo/ResultVo";

export class AdminController {
  static addHero = async (req, res) => {
    const {name, email, sex, country, address, photo, powers} = req.body;

    const newHero = new Hero();
    newHero.name = name;
    newHero.email = email;
    newHero.sex = sex;
    newHero.country = country;
    newHero.address = address;
    newHero.photo = photo;
    await getConnection().getRepository(Hero).save(newHero);

    if (powers && powers.length > 0) {
      const newPowers = powers.map(power => {
        const p = new Power();
        p.name = power;
        p.hero = newHero;  // relation key
        return p;
      })
      // bulk insert
      await getConnection().createQueryBuilder().insert().into(Power).values(newPowers).execute();
    }

    res.send(new ResultVo(0, 'success'));
  }
}