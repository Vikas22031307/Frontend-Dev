import "./StudentDetails.css";

function StudentDetails({ student, onBack }) {
  if (!student) {
    return (
      <>
        <header className="app-header">
          <div>
            <h2 className="app-title">Student Details</h2>
            <p className="app-subtitle">No student selected.</p>
          </div>
          <button className="btn btn-ghost" onClick={onBack}>
            Back to List
          </button>
        </header>
      </>
    );
  }

  return (
    <>
      <header className="app-header">
        <div>
          <h2 className="app-title">Student Details</h2>
          <p className="app-subtitle">
            A quick snapshot of the selected student.
          </p>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>
          Back to List
        </button>
      </header>

      <div className="details-wrapper">
        <div className="details-grid">
          <div className="detail-card">
            <p className="detail-label">Student ID</p>
            <p className="detail-value">{student.id}</p>
          </div>

          <div className="detail-card">
            <p className="detail-label">Name</p>
            <p className="detail-value">{student.name}</p>
          </div>

          <div className="detail-card">
            <p className="detail-label">Section</p>
            <p className="detail-value">{student.section}</p>
          </div>

          <div className="detail-card">
            <p className="detail-label">Marks</p>
            <p className="detail-value">{student.marks}</p>
          </div>

          <div className="detail-card">
            <p className="detail-label">Grade</p>
            <p className="grade-pill">{student.grade}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDetails;
