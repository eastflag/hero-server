import {getConnection} from "typeorm";
import {ResultVo} from "../vo/ResultVo";
import {Score} from "../entity/Score";

export class ScoreController {
  static getScores = async (req, res) => {
    const scores = await getConnection()
      .getRepository(Score)
      .find({order: {id: 'DESC'}});

    res.send(scores);
  }

  static addScore = async (req, res) => {
    const {name} = req.body;

    const score = new Score();
    score.name = name;
    await getConnection().getRepository(Score).save(score);

    res.send(new ResultVo(0, 'success'));
  }

  static removeScore = async (req, res) => {
    const {id} = req.query;

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Score)
      .where("id = :id", { id })
      .execute();

    const result = new ResultVo(0, 'success');
    res.send(result);
  }
}