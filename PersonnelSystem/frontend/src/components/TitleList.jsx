import React, { useEffect, useState } from 'react';
import { getTitles, createTitle, deleteTitle, updateTitle } from '../services/api';

function TitleList() {
    const [titles, setTitles] = useState([]);
    const [newTitle, setNewTitle] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadTitles();
    }, []);

    const loadTitles = async () => {
        try {
            const response = await getTitles();
            setTitles(response.data);
        } catch (error) {
            console.error('Error loading titles:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateTitle(editingId, { ...newTitle, id: editingId });
                setEditingId(null);
            } else {
                await createTitle(newTitle);
            }
            setNewTitle({ name: '', description: '' });
            loadTitles();
        } catch (error) {
            console.error('Error saving title:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteTitle(id);
            loadTitles();
        } catch (error) {
            console.error('Error deleting title:', error);
        }
    };

    const handleEdit = (title) => {
        setNewTitle({ name: title.name, description: title.description });
        setEditingId(title.id);
    };

    return (
        <div className="card">
            <div className="flex-between mb-4">
                <h2>Titles</h2>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Senior Developer"
                            value={newTitle.name}
                            onChange={(e) => setNewTitle({ ...newTitle, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title description"
                            value={newTitle.description}
                            onChange={(e) => setNewTitle({ ...newTitle, description: e.target.value })}
                        />
                    </div>
                    <div className="form-actions" style={{ margin: 0 }}>
                        <button type="submit" className="btn btn-primary">
                            {editingId ? 'Update' : 'Add Title'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => { setEditingId(null); setNewTitle({ name: '', description: '' }); }}
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
                        {titles.map((title) => (
                            <tr key={title.id}>
                                <td><b>{title.name}</b></td>
                                <td>{title.description}</td>
                                <td>
                                    <button onClick={() => handleEdit(title)} className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(title.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {titles.length === 0 && <p className="text-muted" style={{ textAlign: 'center', margin: '2rem 0' }}>No titles found.</p>}
        </div>
    );
}

export default TitleList;
