const db = require("../config/database");

const getFullNameByIDCustomer = async (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT fullname FROM customer c join account a on a.account_id = c.account_id where c.account_id = ?";
    const values = [id]; // Use the corrected variable name
    db.query(sql, values, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ Error: "Error fetching account ID" });
        }
        return res.status(200).json({ Status: "Success", Customer: result });
    });
};



module.exports = {
    getFullNameByIDCustomer,
};
