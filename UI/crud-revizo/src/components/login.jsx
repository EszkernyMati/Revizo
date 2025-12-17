import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";
import '../styles/LoginPanel.css'

function LoginPanel() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setError('');

        
        if (login === "admin" && password === "test") {
            navigate("/groups");
        } else {
            setError('Niepoprawny login lub hasło');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-wrapper">
            <div className="glass login-container">
                <div className="brand-header">
                    <h1 className="revizo-logo">REVIZO</h1>
                    <p className="subtitle">System Zarządzania</p>
                </div>
                
                <h2>Zaloguj się</h2>
                <hr className="hr-accent" />
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="login">
                            <FaUser className="form-icon" /> LOGIN
                        </label>
                        <input 
                            id="login"
                            type="text" 
                            required 
                            placeholder="Wprowadź login"
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <FaLock className="form-icon" /> HASŁO
                        </label>
                        <div className="password-input-container">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                required 
                                placeholder="••••••••"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="password-input" 
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="password-toggle-btn"
                                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <div className="button-container">
                        <button type="submit" className="btn-login">ZALOGUJ SIĘ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPanel;