import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (_req: Request, res: Response, _next: NextFunction) {
  const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
  res.render("index", { title: "Express", linkedinClientId });
});

module.exports = router;
