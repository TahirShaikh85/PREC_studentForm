const studentSchema = require("../model/studentSchema");

// POST: /api/createStudent
exports.createStudent = async (req, res) => {
  try {
    // Check if the request body is empty.
    if (!req.body) {
      return res.status(400).send("Please fill the form");
    }

    // Create a new student object using the 'studentSchema' model and the request body data.
    const data = new studentSchema(req.body);

    // Save the new student to the database.
    const newStudent = await data.save();

    // Return the newly created student as a response.
    res.status(200).send(newStudent);
    
  } catch (error) {
    res.status(500).send("Error while creating student: " + error);
  }
};

// GET: /api/getAllStudents
exports.getAllStudents = async (req, res) => {
  try {
    // Fetch all student records from the database.
    const studentData = await studentSchema.find();

    res.status(200).send(studentData);
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
    
    const studentObjectId = req.params.studentId; // Extract the student ID from the URL parameter.
 
    const updatedData = req.body; // Extract the updated data from the request body.

    // Find and update the student record with the specified ID.
    const updatedStudent = await studentSchema.findByIdAndUpdate({ _id: studentObjectId }, updatedData, { new: true });

    // If the student with the specified ID is not found, return a 404 error.
    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send(updatedStudent);
  } catch (error) {
    res.status(500).send("Error while updating student: " + error);
  }
};

// Delete a specific student record by their ID.
exports.deleteStudent = async (req, res) => {
  try {
    // Extract the student ID from the URL parameter.
    const studentObjectId = req.params.studentId;

    // Find and delete the student record with the specified ID.
    const deleteStudent = await studentSchema.findByIdAndDelete({ _id: studentObjectId });

    res.status(200).send("Student deleted successfully");
  } catch (error) {
    res.status(500).send("Error while deleting student: " + error);
  }
};
