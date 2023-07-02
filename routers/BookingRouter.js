const router = require('express').Router();
const {
  getBookings,
  postBooking,
} = require('../controllers/bookingController');

router.get('/bookings', getBookings);
router.post('/booking', postBooking);

module.exports = router;
