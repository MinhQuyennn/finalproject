const db = require("../config/database");
const { format } = require("date-fns");

const formatDate = (date) => {
  try {
    if (!date || isNaN(date.getTime())) {
      return null;
    }

    return format(date, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return null;
  }
};

exports.getAllTrains = (req, res) => {
  const sql = "SELECT * from train";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching trains from the database", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "There is no train available" });
    }

    const trains = result.map((row) => ({
      train_name: row.train_name,
      total_seat_of_one_train: row.total_seat_of_one_train,
      total_of_carriage: row.total_of_carriage,
    }));

    return res.status(200).json({ trains });
  });
};

exports.getTrainData = (req, res) => {
  try {
    if (!db) {
      console.log("Database connection not established!");
      return res.status(500).json({ message: "Internal server error" });
    }

    const encodedDepartureName = req.params.departure_station;
    const decodedDepartureName = decodeURIComponent(encodedDepartureName);
    const encodedArrivalName = req.params.arrival_station;
    const decodedArrivalName = decodeURIComponent(encodedArrivalName);
    const departure_date = req.params.departure_date;
    console.log("Encode departure station name: ", encodedDepartureName);
    console.log("Decode departure station name: ", decodedDepartureName);
    console.log("Encode arrival station name: ", encodedArrivalName);
    console.log("Decoded arrival station name: ", decodedArrivalName);

    const sql =
      "SELECT r.route_id, t.train_id, t.train_name, total_seat_of_one_train, t.total_of_carriage, departure_station, arrival_station, departure_date, arrival_date FROM route r JOIN trainroute tr ON r.route_id = tr.route_id JOIN train t ON t.train_id = tr.train_id WHERE r.departure_station = ? AND r.arrival_station = ? AND r.departure_date = ?";
    const values = [decodedDepartureName, decodedArrivalName, departure_date];

    db.query(sql, values, (error, result) => {
      if (error) {
        console.error("Database query error: ", error);
        return res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }

      console.log("Result from the database: ", result);

      if (result.length === 0) {
        return res
          .status(400)
          .json({ message: "Departure or Arrival do not exist" });
      }

      const list = result.map((row) => ({
        route_id: row.route_id,
        train_id: row.train_id,
        train_name: row.train_name,
        total_seat_of_one_train: row.total_seat_of_one_train,
        total_of_carriage: row.total_of_carriage,
        departure_station: row.departure_station,
        arrival_station: row.arrival_station,
        departure_date: formatDate(row.departure_date),
        arrival_date: formatDate(row.arrival_date),
      }));

      return res.status(200).json({ list });
    });
  } catch (error) {
    console.log("Error retrieving train from suggestion", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
