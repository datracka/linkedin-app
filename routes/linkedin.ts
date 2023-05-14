import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/* GET home page. */
router.get(
  "/callback",
  function (_req: Request, res: Response, next: NextFunction) {
    res.render("callback");
  }
);

module.exports = router;
