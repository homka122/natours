import Stripe from 'stripe';
import Tour from '../models/tourModel.js';
import Booking from '../models/bookingModel.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from './handlerFactory.js';
import AppError from '../utils/appError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourID);
  let product = {};

  try {
    product = await stripe.products.retrieve(tour.slug);
  } catch (err) {
    product = await stripe.products.create({
      id: tour.slug,
      name: tour.name + ' Tour',
      description: tour.summary,
      default_price_data: {
        currency: 'rub',
        unit_amount: tour.price * 10000,
      },
      images: [
        'https://sun9-83.userapi.com/impg/aJPca5Ps6ATZehUOdmQx8NUMcg1vgYWjm--0Cg/45qnebtT7ZE.jpg?size=600x600&quality=95&sign=6706d55b2dd9e2f9fb505900a86431f8&type=album',
      ],
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourID
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price: product.default_price,
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

export const createBookingCheckout = catchAsync(async (req, res, next) => {
  // Temporary
  const { tour, user, price } = req.query;

  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

export const getAllBookings = factory.getAll(Booking);
export const getBooking = factory.getOne(Booking);
export const createBooking = factory.createOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);
export const updateBooking = factory.updateOne(Booking);
