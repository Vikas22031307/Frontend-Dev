import { useState } from "react";
import "./StudentForm.css";

function StudentForm({ initialData, onCancel, onSubmit, isEditing }) {
  const [name, setName] = useState(initialData?.name || "");
  const [section, setSection] = useState(initialData?.section || "");
  const [marks, setMarks] = useState(initialData?.marks || "");
  const [grade, setGrade] = useState(initialData?.grade || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !section || marks === "" || !grade) {
      alert("Please fill all fields.");
      return;
    }

    const marksNumber = Number(marks);
    if (Number.isNaN(marksNumber) || marksNumber < 0 || marksNumber > 100) {
      alert("Marks should be a number between 0 and 100.");
      return;
    }

    const studentPayload = {
      name: name.trim(),
      section: section.trim(),
      marks: marksNumber,
      grade: grade.trim()
    };

    onSubmit(studentPayload);
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h2 className="app-title">
            {isEditing ? "Edit Student" : "Add New Student"}
          </h2>
          <p className="app-subtitle">
            Fill in the details below and save the record.
          </p>
        </div>
        <button className="btn btn-ghost" onClick={onCancel}>
          Back to List
        </button>
      </header>

      <div className="form-wrapper">
        <p className="form-caption">
          Fields with correct marks and grade keep your result sheet reliable.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              value={name}
              placeholder="Enter student name"
              onChange={(e) => setName(e.target.value)}
            />
            <span className="form-hint">Example: Rahul Sharma</span>
          </div>

          <div className="form-group">
            <label className="form-label">Section</label>
            <input
              className="form-input"
              type="text"
              value={section}
              placeholder="e.g. A, B, C"
              onChange={(e) => setSection(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Marks</label>
            <input
              className="form-input"
              type="number"
              value={marks}
              placeholder="0 - 100"
              onChange={(e) => setMarks(e.target.value)}
            />
            <span className="form-hint">
              Enter total marks out of 100 for this student.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Grade</label>
            <input
              className="form-input"
              type="text"
              value={grade}
              placeholder="e.g. A, B, C"
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <div className="btn-row">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Save Changes" : "Add Student"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default StudentForm;
