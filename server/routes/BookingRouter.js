const express = require('express');
const { createBookings, updateBookingDetails, deleteBookings, getAllBookings } = require('../controller/Bookings');
const router = express.Router();

router.post("/createBooking", createBookings)
router.put("/updateBooking/:id", updateBookingDetails)
router.delete("/deleteBooking/:id", deleteBookings)
router.get("/getAllBooking/:id", getAllBookings)

module.exports = router;
