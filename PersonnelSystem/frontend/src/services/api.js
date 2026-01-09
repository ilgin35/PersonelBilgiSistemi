import axios from 'axios';

const API_URL = 'https://localhost:7058/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getDepartments = () => api.get('/Departments');
export const getDepartment = (id) => api.get(`/Departments/${id}`);
export const createDepartment = (data) => api.post('/Departments', data);
export const updateDepartment = (id, data) => api.put(`/Departments/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/Departments/${id}`);

export const getTitles = () => api.get('/Titles');
export const getTitle = (id) => api.get(`/Titles/${id}`);
export const createTitle = (data) => api.post('/Titles', data);
export const updateTitle = (id, data) => api.put(`/Titles/${id}`, data);
export const deleteTitle = (id) => api.delete(`/Titles/${id}`);

export const getPersonnels = () => api.get('/Personnels');
export const getPersonnel = (id) => api.get(`/Personnels/${id}`);
export const createPersonnel = (data) => api.post('/Personnels', data);
export const updatePersonnel = (id, data) => api.put(`/Personnels/${id}`, data);
export const deletePersonnel = (id) => api.delete(`/Personnels/${id}`);
export const uploadPhoto = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/Personnels/upload-photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;
