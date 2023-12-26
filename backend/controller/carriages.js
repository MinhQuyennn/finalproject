const db = require("../config/database");

const getAllCarriages = (req, res) => {
  const train_id = req.params.train_id;

  const sql = "SELECT * FROM carriage WHERE train_id = ?";
  db.query(sql, [train_id], (err, result) => {
    if (err) {
      console.error("Error fetching carriages from the database", err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No carriages found for the given train" });
    }

    const carriages = result.map((row) => ({
      carriage_id: row.carriage_id,
      carriage_type: row.carriage_type,
    }));

    return res.status(200).json({ carriages });
  });
};

const getAllSeats = (req, res) => {
  const carriage_id = req.params.carriage_id;

  const sql = "SELECT * FROM seat WHERE carriage_id = ?";
  db.query(sql, [carriage_id], (err, result) => {
    if (err) {
      console.error("Error fetching seats from the database", err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No seats found for the given carriage" });
    }

    const listseat = result.map((row) => ({
      seat_id: row.seat_id,
      status: row.status,
      price: row.price,
    }));

    return res.status(200).json({ listseat });
  });
};

module.exports = {
  getAllCarriages,
  getAllSeats,
};
