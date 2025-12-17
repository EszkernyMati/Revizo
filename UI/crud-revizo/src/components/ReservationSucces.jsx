import React from 'react';
import { FaCheckCircle, FaHome, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ReservationSuccess() {
    const navigate = useNavigate();

    return (
        <div className="success-wrapper">
            <div className="success-card glass">
                <div className="success-icon-circle">
                    <FaCheckCircle />
                </div>
                
                <div className="section-title">
                    <h2>Rezerwacja potwierdzona!</h2>
                    <div className="hr-accent-mini" style={{ width: '80px', marginBottom: '20px' }}></div>
                </div>

                <p>
                    Dziękujemy za skorzystanie z naszych usług. <br />
                    Potwierdzenie Twojej wizyty zostało zapisane w naszym systemie. 
                    Wkrótce otrzymasz powiadomienie z przypomnieniem o terminie.
                </p>

                <div className="success-actions">
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn-primary-action"
                    >
                        <FaHome style={{ marginRight: '10px' }} /> Wróć do strony głównej
                    </button>
                    
                    <button 
                        onClick={() => navigate('/reservation')} 
                        className="btn-secondary"
                    >
                        <FaCalendarAlt /> Umów kolejną wizytę
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservationSuccess;