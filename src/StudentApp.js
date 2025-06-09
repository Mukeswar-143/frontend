import React, { useState, useEffect } from "react";
import './StudentApp.css';

const apiBaseUrl = "http://localhost:8080/Student";

function StudentApp() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        id: "",
        name: "",
        gender: "",
        natonality: "",
        aadhaarnumber: "",
        phone_number: "",
        email: "",
        address: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/details`);
            const data = await response.json();
            setStudents(data);
        } catch (err) {
            console.error("Failed to fetch students:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `${apiBaseUrl}/${form.id}` : `${apiBaseUrl}/entry`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const savedStudent = await response.json();
            console.log("Saved student with ID:", savedStudent.id);

            setForm({
                id: "",
                name: "",
                gender: "",
                natonality: "",
                aadhaarnumber: "",
                phone_number: "",
                email: "",
                address: "",
            });
            setIsEdit(false);
            fetchStudents();
        } catch (err) {
            console.error("Failed to save student:", err);
        }
    };

    const handleEdit = (student) => {
        console.log("Editing student:", student);
        setForm(student);
        setIsEdit(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const response = await fetch(`${apiBaseUrl}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }
            fetchStudents();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Management</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <div>
                    <label>Name: </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender: </label>
                    <input
                        name="gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Nationality: </label>
                    <input
                        name="natonality"
                        value={form.natonality}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Aadhaar Number: </label>
                    <input
                        name="aadhaarnumber"
                        value={form.aadhaarnumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number: </label>
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label>Address: </label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">{isEdit ? "Update Student" : "Add Student"}</button>
                {isEdit && (
                    <button
                        type="button"
                        onClick={() => {
                            setForm({
                                id: "",
                                name: "",
                                gender: "",
                                natonality: "",
                                aadhaarnumber: "",
                                phone_number: "",
                                email: "",
                                address: "",
                            });
                            setIsEdit(false);
                        }}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h3>All Students</h3>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Nationality</th>
                        <th>Aadhaar Number</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 && (
                        <tr>
                            <td colSpan="9">No students found.</td>
                        </tr>
                    )}
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.gender}</td>
                            <td>{student.natonality}</td>
                            <td>{student.aadhaarnumber}</td>
                            <td>{student.phone_number}</td>
                            <td>{student.email}</td>
                            <td>{student.address}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Edit</button>{" "}
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentApp;
