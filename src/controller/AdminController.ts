import {Hero} from "../entity/Hero";
import {getConnection} from "typeorm";
import {Power} from "../entity/Power";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

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

  static addPhoto = async (req, res) => {
    console.log(req.file);

    // s3 upload configuring parameters
    const params = {
      Bucket: 'eastdb-burket',
      Body : req.file.buffer,
      Key : "photo/" + Date.now() + "_" + req.file.originalname,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    let response, result;
    try {
      response = await s3.upload(params).promise();
      console.log(response);
    } catch (err) {
      console.log(err);
      result = new ResultVo(500, 'S3 error');
      res.send(result);
    }

    result = new ResultVo(0, 'success');
    result.data = response.Location;

    res.send(result);
  }

}