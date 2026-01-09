import React, { useEffect, useState } from 'react';
import { getPersonnels, deletePersonnel, getDepartments, getTitles, createPersonnel, updatePersonnel } from '../services/api';

function PersonnelList() {
    const [personnels, setPersonnels] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [titles, setTitles] = useState([]);

    // Form state
    const [formData, setFormData] = useState({
        registryNo: '',
        name: '',
        surname: '',
        departmentId: '',
        titleId: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [pRes, dRes, tRes] = await Promise.all([
                getPersonnels(),
                getDepartments(),
                getTitles()
            ]);
            setPersonnels(pRes.data);
            setDepartments(dRes.data);
            setTitles(tRes.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deletePersonnel(id);
            loadData();
        } catch (error) {
            console.error('Error deleting personnel:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                departmentId: parseInt(formData.departmentId),
                titleId: parseInt(formData.titleId),
                id: editingId || 0
            };

            if (editingId && editingId > 0) {
                await updatePersonnel(editingId, payload);
                setEditingId(null);
            } else {
                // Ensure ID is 0 for create
                const createPayload = { ...payload, id: 0 };
                await createPersonnel(createPayload);
            }

            setFormData({ registryNo: '', name: '', surname: '', departmentId: '', titleId: '' });
            loadData();
        } catch (error) {
            console.error('Error saving personnel:', error);

            let errorMessage = 'Error saving personnel.';
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (typeof error.response.data === 'object') {
                    // Start formatting validation errors if available
                    if (error.response.data.errors) {
                        errorMessage = Object.values(error.response.data.errors).flat().join('\n');
                    } else {
                        errorMessage = JSON.stringify(error.response.data, null, 2);
                    }
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            alert(`Error: ${errorMessage}`);
        }
    };

    const handleEdit = (p) => {
        setFormData({
            registryNo: p.registryNo,
            name: p.name,
            surname: p.surname,
            departmentId: p.departmentId,
            titleId: p.titleId,
        });
        setEditingId(p.id);
    };

    return (
        <div className="card">
            <div className="flex-between mb-4">
                <div>
                    <h2>Personnel List</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-1rem' }}>Manage your organization's workforce</p>
                </div>
                {!editingId && (
                    <button onClick={() => setEditingId(-1)} className="btn btn-primary" style={{ display: editingId === -1 ? 'none' : 'flex' }}>
                        + Add New
                    </button>
                )}
            </div>

            {(editingId !== null) && (
                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {editingId > 0 ? '✏️ Edit Personnel' : '✨ Add New Personnel'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label">Registry No</label>
                                <input className="form-control" value={formData.registryNo} onChange={e => setFormData({ ...formData, registryNo: e.target.value })} placeholder="e.g. 1045" required />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label">Name</label>
                                <input className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="First Name" required />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label">Surname</label>
                                <input className="form-control" value={formData.surname} onChange={e => setFormData({ ...formData, surname: e.target.value })} placeholder="Last Name" required />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label">Department</label>
                                <select className="form-control" value={formData.departmentId} onChange={e => setFormData({ ...formData, departmentId: e.target.value })} required>
                                    <option value="">Select Department</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label">Title</label>
                                <select className="form-control" value={formData.titleId} onChange={e => setFormData({ ...formData, titleId: e.target.value })} required>
                                    <option value="">Select Title</option>
                                    {titles.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-actions" style={{ justifyContent: 'flex-end', marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setFormData({ registryNo: '', name: '', surname: '', departmentId: '', titleId: '' }); }}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingId > 0 ? 'Save Changes' : 'Create Personnel'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="table" style={{ verticalAlign: 'middle' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>ID</th>
                            <th style={{ width: '25%' }}>Employee</th>
                            <th style={{ width: '20%' }}>Department</th>
                            <th style={{ width: '20%' }}>Title</th>
                            <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnels.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <span className="badge badge-indigo">#{p.registryNo}</span>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{p.name} {p.surname}</div>
                                </td>
                                <td>
                                    <span className="badge badge-slate">{p.department?.name}</span>
                                </td>
                                <td>
                                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{p.title?.name}</span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button onClick={() => handleEdit(p)} className="btn-icon" title="Edit">
                                        ✏️
                                    </button>
                                    <button onClick={() => handleDelete(p.id)} className="btn-icon delete" title="Delete" style={{ marginLeft: '0.5rem' }}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {personnels.length === 0 && (
                <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '1rem', marginTop: '2rem', border: '2px dashed #e2e8f0' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No personnel records found.</p>
                    <button onClick={() => setEditingId(-1)} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Add Your First Employee
                    </button>
                </div>
            )}
        </div>
    );
}

export default PersonnelList;
