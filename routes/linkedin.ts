import express, { Request, Response, NextFunction } from "express";
import request from "request";
const router = express.Router();

/* GET home page. */
// https://localhost/linkedin/callback?code=AQRzS_DYfm6p5-vWlGl_D_41Lz3r-m3KdqJxp6mxCBns9EnbmMW8zACQGsRwK32Hm6PgofQ1mihmYO3LO9gmXIZP9xxHa0dJplK3q-TYnTGEbf54acWPLg3yKkxFMtV9jyCaYCbKwqW6kJa5HNxqNySmArATMkJDaOOmO7hkgKYc8AWbt2wlwfXui-FjGc-x7Uz8hKBy2vs-YCAcWLs&state=foobar
router.get(
  "/callback",
  function (req: Request, res: Response, next: NextFunction) {
    console.log(req.query.code, req.query);
  }
);

module.exports = router;
