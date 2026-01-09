import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        marginRight: '1.5rem',
        textDecoration: 'none',
        color: isActive(path) ? '#4f46e5' : '#64748b',
        fontWeight: isActive(path) ? '600' : '500',
        borderBottom: isActive(path) ? '2px solid #4f46e5' : '2px solid transparent',
        paddingBottom: '0.25rem',
        transition: 'all 0.2s'
    });

    return (
        <nav style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 0',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
                <h1 style={{ fontSize: '1.25rem', marginRight: '2rem', margin: 0, color: '#1e293b' }}>Personel System</h1>
                <div>
                    <Link to="/" style={linkStyle('/')}>Personnels</Link>
                    <Link to="/departments" style={linkStyle('/departments')}>Departments</Link>
                    <Link to="/titles" style={linkStyle('/titles')}>Titles</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
