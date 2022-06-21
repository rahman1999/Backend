import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";
import { Review } from "../entity/Review";
import AppDataSource from "../data-source";

export default class ReviewClass {
  async addReview(req: Request, res: Response) {
    const review = new Review();
    review.review_rating = req.body.rating;
    review.review_comment = req.body.comment;
    review.review = req.body.reviewid;
    var ProductRepository = AppDataSource.getRepository(Review);
    await ProductRepository.save(review)
      .then((result) => {
        res.json({
          msg: "review Created",
          status: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
}
