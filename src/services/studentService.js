const BASE_URL = "http://localhost:3001/students";

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Something went wrong");
  }
  return response.json();
}

export async function fetchStudents() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

export async function createStudent(studentData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData)
  });
  return handleResponse(res);
}

export async function updateStudent(id, studentData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData)
  });
  return handleResponse(res);
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to delete student");
  }
  return true;
}
