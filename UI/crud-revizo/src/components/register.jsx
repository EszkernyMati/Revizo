import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";
import '../styles/index.css'

function RegisterPanel() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setError('');
        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne!');
            return;
        }
        navigate("/login");
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="login-wrapper">
            <div className="glass login-container">
                <div className="brand-header">
                    <h1 className="revizo-logo">REVIZO</h1>
                    <p className="subtitle">Rejestracja</p>
                </div>
                
                <h2>Załóż konto</h2>
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
                            placeholder="Wybierz login"
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <FaEnvelope className="form-icon" /> EMAIL
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            required 
                            placeholder="twoj@email.pl"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
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
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <FaLock className="form-icon" /> POWTÓRZ HASŁO
                        </label>
                        <input 
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"} 
                            required 
                            placeholder="••••••••"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <div className="button-container">
                        <button type="submit" className="btn-login">ZAREJESTRUJ SIĘ</button>
                    </div>

                    <div style={{textAlign: 'center', marginTop: '1rem'}}>
                        <p style={{fontSize: '0.9rem', color: '#000000ff'}}>
                            Masz już konto? <span 
                                onClick={() => navigate("/login")} 
                                style={{color: '#000000', cursor: 'pointer', textDecoration: 'underline'}}
                            >
                                Zaloguj się
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPanel;