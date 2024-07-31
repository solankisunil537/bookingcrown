const Bookings = require("../model/Bookings");

exports.createBookings = async (req, res) => {
    try {
        const { customerName, mobilenu, date, timeFrom, timeTo, turfOrTable, amount, advance, pending, bookingType, session, userId } = req.body;

        let totalHours = 0;
        if (bookingType === 'Hourly' && timeFrom && timeTo) {
            const diffMs = new Date(timeTo) - new Date(timeFrom);
            totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
        }

        const booking = new Bookings({
            userId,
            customerName,
            mobilenu,
            date,
            timeFrom,
            timeTo,
            totalHours,
            turfOrTable,
            amount,
            advance,
            pending,
            bookingType,
            session
        });

        await booking.save();
        res.status(200).json({ booking, message: "Booking created succesfully", success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateBookingDetails = async (req, res) => {
    try {
        const { name, phone, date, timeFrom, timeTo, turfOrTable, amount, advance, pending, bookingType, session } = req.body;

        let totalHours = 0;
        if (bookingType === 'Hourly' && timeFrom && timeTo) {
            const diffMs = new Date(timeTo) - new Date(timeFrom);
            totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
        }

        const booking = await Bookings.findByIdAndUpdate(req.params.id, {
            name,
            phone,
            date,
            timeFrom,
            timeTo,
            totalHours,
            turfOrTable,
            amount,
            advance,
            pending,
            bookingType,
            session
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
        const userId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const totalCount = await Bookings.countDocuments({ userId });

        const bookings = await Bookings.find({ userId })
            .skip(skip)
            .limit(limit);

        if (!bookings.length) return res.status(404).json({ error: 'No bookings found' });

        res.status(200).json({
            message: 'Booking data retrieved successfully',
            success: true,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            bookings
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
