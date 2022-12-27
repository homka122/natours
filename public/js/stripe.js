import axios from 'axios';
import { showAlert } from './alerts';

/* eslint-disable */

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51MIlEYEJuR6pn22RJ50uzP9tfnPYz9P38gfnAFR5mdSYwwMtkCNTSf0Ax3nwcn1UWS3VhRcf9zbqLowcy0KdjI0C00nDC41Wei'
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout from + charge credit card
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
