const Table = require("../model/Table");

exports.createTableList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { tableNumber } = req.body;

        if (!userId || !tableNumber) {
            return res.status(400).json({ message: 'User ID and Table Number are required' });
        }

        const parsedTableNumber = parseInt(tableNumber, 10);
        if (isNaN(parsedTableNumber) || parsedTableNumber <= 0) {
            return res.status(400).json({ message: 'Invalid table number provided' });
        }

        const tableNumbers = Array.from({ length: parsedTableNumber }, (_, i) => i + 1);

        const newTable = new Table({
            userId,
            tableNumbers
        });

        const savedTable = await newTable.save();

        res.status(200).json({ savedTable, message: "Table List added successfully" });
    } catch (error) {
        console.error("Error creating table list:", error);
        res.status(500).json({ error, message: error.message });
    }
}
