import { Router, Request, Response, NextFunction } from "express";

const router = Router();
router.get("/token", (req: Request, res: Response, _: NextFunction) => {
  res.send({ token: req.csrfToken() });
});

export default router;
