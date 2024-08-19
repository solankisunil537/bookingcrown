const Bookings = require("../model/Bookings");

exports.createBookings = async (req, res) => {
    try {
        const userId = req.user.id
        const { customerName, mobilenu, date, time, turfOrTable, totalHours, amount, advance, pending, bookingType, session, item } = req.body;

        const booking = new Bookings({
            userId,
            customerName,
            mobilenu,
            date,
            time,
            totalHours,
            turfOrTable,
            amount,
            advance,
            pending,
            bookingType,
            session,
            item
        });

        await booking.save();
        res.status(200).json({ booking, message: "Booking created succesfully", success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateBookingDetails = async (req, res) => {
    try {
        const { name, phone, date, time, turfOrTable, totalHours, amount, advance, pending, bookingType, session, item } = req.body;

        const booking = await Bookings.findByIdAndUpdate(req.params.id, {
            name,
            phone,
            date,
            time,
            totalHours,
            turfOrTable,
            amount,
            advance,
            pending,
            bookingType,
            session,
            item
        }, { new: true });

        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json({ booking, message: "Booking updated succesfully", success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteBookings = async (req, res) => {
    try {
        const booking = await Bookings.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully', success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Bookings.find({ userId: userId })

        if (!bookings.length) return res.status(400).json({ message: 'No bookings found' });

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getSingleBooking = async (req, res) => {
    try {
        const id = req.params.id;

        const bookings = await Bookings.findById(id)

        if (!bookings) return res.status(404).json({ error: 'No bookings found' });

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const id = req.params.id
        const bookings = await Bookings.findById(id)
        if (!bookings) return res.status(404).json({ message: "Booking data not found !" })

        if (!bookings.isCanceled) {
            bookings.isCanceled = true
        } else {
            return res.status(200).json({ success: true, message: "Booking is already cancelled !" })
        }
        await bookings.save()
        res.status(200).json({
            message: 'Booking cancelled successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
