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

const getEmployeeByAcc = async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee e JOIN account a ON e.account_id = a.account_id WHERE e.account_id = ?";
    const values = [id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Error fetching account ID" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ Error: "Employee not found" });
      }
  
      const employeeData = result[0];
      const { status } = employeeData;
  
      return res.status(200).json({ Status: status, employee: employeeData });
    });
  };
  
  

const getDatafromUser = async (req, res) => {
    const sql = "SELECT * FROM employee e join account a on e.account_id = a.account_id";
    db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({ Error: "Error fetching account" });
        }
        return res.status(200).json({ Status: "Success", accounts: result });
      });
    };

    const getDatafromUserAndStatusFillter = async (req, res) => {
        const status = req.params.status; 
        const sql = "SELECT * FROM employee e JOIN account a ON e.account_id = a.account_id WHERE e.status = ?";
        const values = [status];
        console.log("SQL Query:", sql);
        console.log("SQL Parameters:", values);
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ Error: "Error fetching account status" });
            }
            return res.status(200).json({ Status: "Employee", employees: result });
        });
    };
    


    const getEmployeesByFullname = async (req, res) => {
        const fullname = req.query.fullname; // Use req.query for query parameters
    
        if (!fullname) {
            return res.status(400).json({ error: "Fullname parameter is required" });
        }
    
        const sql = "SELECT * FROM employee e JOIN account a ON e.account_id = a.account_id WHERE e.fullname LIKE ?";
        const values = [`%${fullname}%`];
    
        console.log("SQL Query:", sql);
        console.log("SQL Parameters:", values);
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ error: "Error fetching employees by name" });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: "No employees found with the specified name" });
            }
    
            return res.status(200).json({ status: "Employee", employees: result });
        });
    };
    
    
    


const UpdateStatusByID = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const status = req.body.status;

        const sql = "UPDATE employee SET status = ? WHERE employee_id = ?";
        const values = [status, employee_id];

        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        // Check if the update affected any rows
        if (result.affectedRows > 0) {
            return res.status(200).json({ Status: "Updated successfully" });
        } else {
            return res.status(404).json({ Error: "Record not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ Error: "Internal server error" });
    }
};

  
  
const deleteEmployeeByID = async (req, res) => {
    const employee_id = req.params.id;
    const sql = "DELETE FROM employee WHERE employee_id = ?";
    const values = [employee_id];
  
    try {
      const [result] = await db.promise().query(sql, values);
      // Check if the row was deleted
      if (result.affectedRows === 0) {
        return res.status(404).json({ Error: "not found" });
      }
  
      return res.status(200).json({ Status: "Success" });
    } catch (err) {
      console.error("Error deleting:", err);
      return res.status(500).json({ Error: "Internal server error" });
    }
  };





module.exports = {
    getFullNameByIDEmployee,
    getDatafromUser,
    getDatafromUserAndStatusFillter,
    UpdateStatusByID,
    getEmployeesByFullname,
    deleteEmployeeByID,
    getEmployeeByAcc
};
