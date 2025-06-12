import React, { useState, useEffect } from "react";
import './StudentApp.css';
import Api from "./services/Api";
const apiBaseUrl = `${Api}/Student`;

function StudentApp() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;
    
    const [form, setForm] = useState({
        id: "",
        name: "",
        gender: "",
        nationality: "",
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

            await response.json();
            setForm({
                id: "",
                name: "",
                gender: "",
                nationality: "",
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

    const handleDeleteAll = async () => {
        if (!window.confirm("Are you sure you want to delete all students? This action cannot be undone.")) return;

        try {
            const response = await fetch(`${apiBaseUrl}/deleteAll`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete all students");
            }

            // Clear students list after deletion
            setStudents([]);
        } catch (err) {
            console.error("Error deleting all students:", err);
        }
    };

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const nextPage = () => {
        if (currentPage < Math.ceil(students.length / studentsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Student Management</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                {["name", "gender", "nationality", "aadhaarnumber", "phone_number", "email", "address"].map((field) => (
                    <div key={field}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                        <input
                            name={field}
                            value={form[field]}
                            onChange={handleInputChange}
                            required={field !== "aadhaarNumber"}
                        />
                    </div>
                ))}
                
                <button type="submit">{isEdit ? "Update Student" : "Add Student"}</button>
                {isEdit && (
                    <button
                        type="button"
                        onClick={() => {
                            setForm({
                                id: "",
                                name: "",
                                gender: "",
                                nationality: "",
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
                    {currentStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.gender}</td>
                            <td>{student.nationality}</td>
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

            <div style={{ marginTop: "20px" }}>
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {Math.ceil(students.length / studentsPerPage)} </span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(students.length / studentsPerPage)}>Next</button>
            </div>

            <button 
                onClick={handleDeleteAll} 
                style={{ marginTop: "15px", backgroundColor: "#dc3545", color: "white" }}
            >
                Delete All Students
            </button>
        </div>
    );
}

export default StudentApp;
