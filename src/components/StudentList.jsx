import "./StudentList.css";

function StudentList({ students, onLoad, onAdd, onEdit, onDelete, onView }) {
  return (
    <>
      <header className="app-header">
        <div>
          <h2 className="app-title">Student Result Management</h2>
          <p className="app-subtitle">
            View, add, update and manage student results in one place.
          </p>
        </div>
      </header>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={onLoad}>
          Load Students
        </button>
        <button className="btn btn-secondary" onClick={onAdd}>
          + Add New Student
        </button>
      </div>

      {students.length === 0 ? (
        <p className="empty-state">
          No students loaded yet. Click <strong>“Load Students”</strong> or{" "}
          <strong>“Add New Student”</strong> to get started.
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.section}</td>
                  <td>{student.marks}</td>
                  <td>{student.grade}</td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() => onView(student)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default StudentList;
