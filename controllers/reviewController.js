import Review from '../models/reviewModel.js';
import AppError from '../utils/appError.js';
import * as factory from './handlerFactory.js';

export const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const validateReview = (req, res, next) => {
  if (req.user.id !== req.body.user) {
    return next(new AppError('You cannot pretend another user!', 401));
  }

  if (req.body.rating % 1 !== 0) {
    return next(new AppError('Rating must a be a numeric'));
  }

  next();
};

export const getAllReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const deleteReview = factory.deleteOne(Review);
export const updateReview = factory.updateOne(Review);
