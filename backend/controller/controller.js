const dbConnection = require('../database/connection');

// POST: /api/createStudent
exports.createStudent = async (req, res) => {
  try {
    // Check if the request body is empty.
    if (!req.body) {
      return res.status(400).send("Please fill the form");
    }

    const studentData = req.body;
    const query = "INSERT INTO students SET ?";

    dbConnection.query(query, studentData, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: " + err);
        res.status(500).json({ error: "Failed to save data" });
        return;
      }
  
      res.status(200).json({ message: "Data saved successfully"});
    });
    
  } catch (error) {
    res.status(500).send("Error while creating student: " + error);
  }
};

// GET: /api/getAllStudents
exports.getAllStudents = async (req, res) => {
  try {
    const query = "SELECT * FROM students";

    dbConnection.query(query,(err,result)=>{
      if(err){
        console.error("Error inserting data into MySQL: " + err);
        res.status(500).json({ error: "Failed to get students data" });
        return;
      }

      res.status(200).json(result);
    })
  } catch (error) {
    res.status(500).send("Error while fetching students: " + error);
  }
};

// PUT: /api/updateStudent/:studentId
exports.updateStudent = async (req, res) => {
  try {
    // Check if the request body is empty.
    if (!req.body) {
      return res.status(400).send("Please fill the form");
    }
    
    const Id = req.params.studentId; // Extract the student ID from the URL parameter.
 
    const updatedData = req.body; // Extract the updated data from the request body.

    const query = "UPDATE STUDENTS SET ? WHERE Id = ?";

    dbConnection.query(query,[updatedData,Id],(error,result)=>{
      if(error){
        return res.status(500).send("Error while updating students: " + error);
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Student not found");
      }

      res.status(200).send("Student updated successfully");

    })

  } catch (error) {
    res.status(500).send("Error while updating student: " + error);
  }
};

// Delete a specific student record by their ID.
exports.deleteStudent = async (req, res) => {
  try {
    // Extract the student ID from the URL parameter.
    const Id = req.params.studentId;

    const query = "DELETE FROM STUDENTS WHERE ID = ?";

    dbConnection.query(query,[Id],(error,result)=>{
      if(error){
        return res.status(500).send("Error while deleting student")
      }
      
      res.status(200).send("Student deleted successfully");
    })
    
  } catch (error) {
    res.status(500).send("Error while deleting student: " + error);
  }
};
