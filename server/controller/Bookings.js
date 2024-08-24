const Bookings = require("../model/Bookings");
const User = require("../model/User");

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
        const {
            name,
            phone,
            date,
            time,
            turfOrTable,
            totalHours,
            amount,
            advance,
            pending,
            bookingType,
            session,
            item,
            fullyPaid
        } = req.body;

        let booking = await Bookings.findById(req.params.id);

        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        if (name !== undefined) booking.name = name;
        if (phone !== undefined) booking.phone = phone;
        if (date !== undefined) booking.date = date;
        if (time !== undefined) booking.time = time;
        if (totalHours !== undefined) booking.totalHours = totalHours;
        if (turfOrTable !== undefined) booking.turfOrTable = turfOrTable;
        if (amount !== undefined) booking.amount = amount;
        if (advance !== undefined) booking.advance = advance;
        if (pending !== undefined) booking.pending = pending;
        if (bookingType !== undefined) booking.bookingType = bookingType;
        if (session !== undefined) booking.session = session;
        if (item !== undefined) booking.item = item;

        if (fullyPaid) {
            booking.payment = 'paid';
            booking.pending = 0;
        } else {
            if (booking.advance === booking.amount || booking.pending === 0) {
                booking.payment = 'paid';
            } else if (booking.advance > 0) {
                booking.payment = 'partial';
            } else {
                booking.payment = 'pending';
            }
        }

        await booking.save();

        res.status(200).json({ booking, message: "Booking updated successfully", success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
        const bookingsData = await Bookings.findById(id)
        if (!bookingsData) return res.status(404).json({ error: 'No bookings found' });

        const ownerData = await User.findById(bookingsData.userId)
        const bookings = { ...bookingsData._doc, ownerData: ownerData }

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
