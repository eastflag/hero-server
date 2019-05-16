export class AdminController {
  static addHero = (req, res) => {
    console.log(req.body);
    res.json(req.body);
  }
}