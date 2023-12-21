const db = require("../config/database");

const getFullNameByIDEmployee = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT fullname FROM employee e join account a on e.account_id = a.account_id where e.account_id = ?";
    const values = [id]; // Use the corrected variable name
    db.query(sql, values, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Employee", Manager: result });
    });
};

module.exports = {
    getFullNameByIDEmployee
};
