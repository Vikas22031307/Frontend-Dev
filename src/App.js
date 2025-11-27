import { useState } from "react";
import "./App.css";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  updateStudent
} from "./services/studentService";

const VIEWS = {
  LIST: "LIST",
  FORM: "FORM",
  DETAILS: "DETAILS"
};

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState(VIEWS.LIST);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  async function handleLoadStudents() {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      alert("Failed to load students: " + error.message);
    }
  }

  function handleAddClick() {
    setSelectedStudent(null);
    setIsEditing(false);
    setCurrentView(VIEWS.FORM);
  }

  function handleEditClick(student) {
    setSelectedStudent(student);
    setIsEditing(true);
    setCurrentView(VIEWS.FORM);
  }

  function handleViewClick(student) {
    setSelectedStudent(student);
    setCurrentView(VIEWS.DETAILS);
  }

  async function handleDeleteClick(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      alert("Student deleted.");
    } catch (error) {
      alert("Failed to delete student: " + error.message);
    }
  }

  function handleCancelForm() {
    setCurrentView(VIEWS.LIST);
    setSelectedStudent(null);
    setIsEditing(false);
  }

  async function handleSubmitForm(studentData) {
    try {
      if (isEditing && selectedStudent) {
        await updateStudent(selectedStudent.id, {
          ...selectedStudent,
          ...studentData
        });
        alert("Student updated.");
      } else {
        await createStudent(studentData);
        alert("Student added.");
      }

      setCurrentView(VIEWS.LIST);
      setSelectedStudent(null);
      setIsEditing(false);

      const latest = await fetchStudents();
      setStudents(latest);
    } catch (error) {
      alert("Failed to save student: " + error.message);
    }
  }

  return (
    <div className="app-root">
      <div className="app-card">
        {currentView === VIEWS.FORM && (
          <StudentForm
            initialData={selectedStudent}
            isEditing={isEditing}
            onCancel={handleCancelForm}
            onSubmit={handleSubmitForm}
          />
        )}

        {currentView === VIEWS.DETAILS && (
          <StudentDetails
            student={selectedStudent}
            onBack={() => {
              setCurrentView(VIEWS.LIST);
              setSelectedStudent(null);
            }}
          />
        )}

        {currentView === VIEWS.LIST && (
          <StudentList
            students={students}
            onLoad={handleLoadStudents}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onView={handleViewClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
