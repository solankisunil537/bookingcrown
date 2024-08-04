const express = require('express');
const { createBookings, updateBookingDetails, deleteBookings, getAllBookings, getSingleBooking, cancelBooking } = require('../controller/Bookings');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post("/createBooking", VerifyToken, createBookings)
router.put("/updateBooking/:id", VerifyToken, updateBookingDetails)
router.delete("/deleteBooking/:id", VerifyToken, deleteBookings)
router.get("/getAllBooking", VerifyToken, getAllBookings)
router.get("/getSingleBooking/:id", VerifyToken, getSingleBooking)
router.put("/cancelBooking/:id", VerifyToken, cancelBooking)

module.exports = router;
