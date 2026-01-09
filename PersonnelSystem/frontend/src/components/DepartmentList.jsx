import React, { useEffect, useState } from 'react';
import { getDepartments, createDepartment, deleteDepartment, updateDepartment } from '../services/api';

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [newDept, setNewDept] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await getDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error loading departments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDepartment(editingId, { ...newDept, id: editingId });
                setEditingId(null);
            } else {
                await createDepartment(newDept);
            }
            setNewDept({ name: '', description: '' });
            loadDepartments();
        } catch (error) {
            console.error('Error saving department:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteDepartment(id);
            loadDepartments();
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleEdit = (dept) => {
        setNewDept({ name: dept.name, description: dept.description });
        setEditingId(dept.id);
    };

    return (
        <div className="card">
            <div className="flex-between mb-4">
                <h2>Departments</h2>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Human Resources"
                            value={newDept.name}
                            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Department description"
                            value={newDept.description}
                            onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                        />
                    </div>
                    <div className="form-actions" style={{ margin: 0 }}>
                        <button type="submit" className="btn btn-primary">
                            {editingId ? 'Update' : 'Add Department'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => { setEditingId(null); setNewDept({ name: '', description: '' }); }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th style={{ width: '150px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept.id}>
                                <td><b>{dept.name}</b></td>
                                <td>{dept.description}</td>
                                <td>
                                    <button onClick={() => handleEdit(dept)} className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(dept.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {departments.length === 0 && <p className="text-muted" style={{ textAlign: 'center', margin: '2rem 0' }}>No departments found.</p>}
        </div>
    );
}

export default DepartmentList;
