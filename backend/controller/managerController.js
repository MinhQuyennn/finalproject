const db = require("../config/database");

const getFullNameByIDManager = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT fullname FROM manager m join account a on m.account_id = a.account_id where m.account_id = ?";
    const values = [id]; // Use the corrected variable name
    db.query(sql, values, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Manager", Manager: result });
    });
};

module.exports = {
    getFullNameByIDManager
};
