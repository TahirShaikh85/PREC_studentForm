// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {

    const fetchButton = document.getElementById("fetch-data");
  fetchButton.addEventListener("click", () => {
    fetch("http://localhost:3000/api/getStudents", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to fetch data");
      })
      .then((data) => {
        console.log(data);
        const tableBody = document.querySelector("#data-table tbody");

        let rollNo = 1;

        data.forEach((student) => {
          const row = document.createElement("tr");

          console.log("objectId", student.id);

          // Display the 'roll no' field
          const rollNoCell = document.createElement("td");
          rollNoCell.textContent = rollNo;
          row.appendChild(rollNoCell);
          rollNo++;

          // Display the 'name' field
          const nameCell = document.createElement("td");
          nameCell.textContent = student.name;
          row.appendChild(nameCell);

          // Display the 'email' field
          const emailCell = document.createElement("td");
          emailCell.textContent = student.email;
          row.appendChild(emailCell);

          const ageCell = document.createElement("td");
          ageCell.textContent = student.age;
          row.appendChild(ageCell);

          const departmentCell = document.createElement("td");
          departmentCell.textContent = student.department;
          row.appendChild(departmentCell);

          const classCell = document.createElement("td");
          classCell.textContent = student.class;
          row.appendChild(classCell);

          const DOBcell = document.createElement("td");
          DOBcell.textContent = student.DOB;
          row.appendChild(DOBcell);

          const genderCell = document.createElement("td");
          genderCell.textContent = student.gender;
          row.appendChild(genderCell);

          const addressCell = document.createElement("td");
          addressCell.textContent = student.address;
          row.appendChild(addressCell);

          const villageCell = document.createElement("td");
          villageCell.textContent = student.village;
          row.appendChild(villageCell);

          const streetCell = document.createElement("td");
          streetCell.textContent = student.street;
          row.appendChild(streetCell);

          const localityCell = document.createElement("td");
          localityCell.textContent = student.locality;
          row.appendChild(localityCell);

          const talukaCell = document.createElement("td");
          talukaCell.textContent = student.taluka;
          row.appendChild(talukaCell);

          const districtCell = document.createElement("td");
          districtCell.textContent = student.district;
          row.appendChild(districtCell);

          const stateCell = document.createElement("td");
          stateCell.textContent = student.state;
          row.appendChild(stateCell);

          const pincodeCell = document.createElement("td");
          pincodeCell.textContent = student.pinCode;
          row.appendChild(pincodeCell);

          const studentMobileCell = document.createElement("td");
          studentMobileCell.textContent = student.studentMobile;
          row.appendChild(studentMobileCell);

          const parentMobileCell = document.createElement("td");
          parentMobileCell.textContent = student.parentMobile;
          row.appendChild(parentMobileCell);

          //   ------ action cell (update & delete) --------
          const actionCell = document.createElement("td");

          const updateBtn = document.createElement("button");
          updateBtn.id = "updateBtn";
          updateBtn.textContent = "✏";

          // event listener to the "update" button
          updateBtn.addEventListener("click", () => {
            // Call the function to populate the form with student data
            populateFormWithStudentData(student);
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.id = "deleteBtn";
          deleteBtn.textContent = "❌";

          // event listener  to the "Delete" button
          deleteBtn.addEventListener("click", () => {
            fetch(`http://localhost:3000/api/deleteStudent/${student.id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Student deleted successfully");
                  window.location.reload();
                  alert(`${student.name} deleted `);
                } else {
                  console.error("Error deleting student");
                }
              })
              .catch((error) => {
                console.error("Network error:", error);
              });
          });

          actionCell.appendChild(updateBtn);
          actionCell.appendChild(deleteBtn);
          row.appendChild(actionCell);

          //   ------ end of action cell --------

          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

function populateFormWithStudentData(student) {
  const form = document.getElementById("survey-form");

  // Seting the form fields with the student's (old) data
  form.elements.name.value = student.name;
  form.elements.email.value = student.email;
  form.elements.age.value = student.age;
  form.elements.department.value = student.department;
  form.elements.class.value = student.class;
  form.elements.DOB.value = student.DOB;
  form.elements.gender.value = student.gender;
  form.elements.address.value = student.address;
  form.elements.village.value = student.village;
  form.elements.street.value = student.street;
  form.elements.locality.value = student.locality;
  form.elements.taluka.value = student.taluka;
  form.elements.district.value = student.district;
  form.elements.state.value = student.state;
  form.elements.pinCode.value = student.pinCode;
  form.elements.studentMobile.value = student.studentMobile;
  form.elements.parentMobile.value = student.parentMobile;

  // hidden input field to store the student's ID
  const studentIdInput = document.createElement("input");
  studentIdInput.type = "hidden";
  studentIdInput.name = "studentId";
  studentIdInput.value = student.id;
  form.appendChild(studentIdInput);
}

const form = document.getElementById("survey-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);

  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const studentId = formDataObject.studentId;
  delete formDataObject.studentId

  // If studentId exists, it means you're updating an existing student
  if (studentId) {
    fetch(`http://localhost:3000/api/updateStudent/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (response.ok) {
          alert("Student updated");
          window.location.reload();
        } else {
          throw new Error("Error updating student");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors and display an error message if needed
      });
  } else {
    // If studentId does not exist, it means you're creating a new student
    fetch("http://localhost:3000/api/createStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        alert("Student Saved");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
