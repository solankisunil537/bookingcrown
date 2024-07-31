const express = require('express');
const db = require('./utils/db');
const UserRouter = require('./routes/UserRouter');
const BookingRouter = require('./routes/BookingRouter');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors")
db()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', UserRouter);
app.use('/api/booking', BookingRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
