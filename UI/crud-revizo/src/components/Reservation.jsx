import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaCalendarCheck, FaClock, FaUserEdit, FaTools, FaPhoneAlt, 
    FaEnvelope, FaIdCard, FaHistory, FaCheckCircle,
    FaChevronRight, FaChevronLeft, FaExclamationTriangle
} from 'react-icons/fa';

const serviceCategories = {
    "Mechanika": ["Wymiana rozrządu", "Naprawa zawieszenia", "Układ hamulcowy", "Serwis silnika"],
    "Eksploatacja": ["Przegląd olejowy", "Filtry i płyny", "Przegląd przed zakupem", "Serwis klimatyzacji"],
    "Diagnostyka": ["Błędy silnika", "Geometria kół", "Sprawdzenie szczelności", "Elektronika"],
    "Inne": ["Wulkanizacja", "Przegląd rejestracyjny", "Mycie i detailing"]
};

const generateHours = () => {
    const hours = [];
    for (let h = 8; h <= 18; h++) {
        const hh = h < 10 ? `0${h}` : h;
        hours.push(`${hh}:00`);
        if (h !== 18) hours.push(`${hh}:30`);
    }
    return hours;
};

function ReservationPanel() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({
        clientName: '',
        phone: '',
        email: '',
        vin: '',
        category: '',
        service: '',
        date: '',
        hour: '',
        internalNotes: ''
    });

    const showToast = (title, msg, type = 'success') => {
        setToast({ title, msg, type });
        if (type === 'error') {
            setTimeout(() => setToast(null), 4000);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const nextStep = () => {
        if (step === 1 && (!formData.clientName || !formData.phone)) {
            showToast("Błąd", "Wypełnij dane kontaktowe przed przejściem dalej", "error");
            return;
        }
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.hour || !formData.date) {
            showToast("Błąd", " Wybierz datę i godzinę wizyty", "error");
            return;
        }

        showToast("Sukces!", " Wizyta została zarezerwowana pomyślnie.");
        
        setTimeout(() => {
            navigate('/reservationsuccess');
        }, 1500);
    };

    return (
        <div className="control-panel-wrapper">
            {toast && (
                <div className="toast-container">
                    <div className={`custom-alert ${toast.type}`}>
                        <div className="alert-icon">
                            {toast.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
                        </div>
                        <div className="alert-content">
                            <span className="alert-title">{toast.title}</span>
                            <span className="alert-msg">{toast.msg}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="service-card">
                <div className="brand-header">
                    <h1 className="revizo-logo">REVIZO</h1>
                    <p className="subtitle">System Rezerwacji</p>
                </div>

                <div className="step-indicator">
                    <div className={`step-pill ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                        <span className="step-number">1</span> Klient
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-pill ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                        <span className="step-number">2</span> Usługa
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="service-form-grid">
                    {step === 1 ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="clientName"><FaUserEdit className="form-icon" /> Klient</label>
                                <input 
                                    type="text" id="clientName" required 
                                    className={!formData.clientName && toast?.type === 'error' ? "input-error" : ""}
                                    placeholder="Imię i Nazwisko" 
                                    value={formData.clientName} onChange={handleInputChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><FaPhoneAlt className="form-icon" /> Telefon</label>
                                <input 
                                    type="tel" id="phone" required 
                                    placeholder="+48 000 000 000" 
                                    value={formData.phone} onChange={handleInputChange} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><FaEnvelope className="form-icon" /> E-mail</label>
                                <input type="email" id="email" placeholder="przyklad@mail.com" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="vin"><FaIdCard className="form-icon" /> VIN</label>
                                <input type="text" id="vin" placeholder="Numer nadwozia" value={formData.vin} onChange={handleInputChange} />
                            </div>
                            <div className="button-container full-width">
                                <button type="button" onClick={nextStep} className="btn-primary-action">
                                    Dalej <FaChevronRight style={{marginLeft: '10px'}}/>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="category"><FaHistory className="form-icon" /> Kategoria</label>
                                <select id="category" required value={formData.category} onChange={handleInputChange}>
                                    <option value="">Wybierz kategorię</option>
                                    {Object.keys(serviceCategories).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="service"><FaTools className="form-icon" /> Usługa</label>
                                <select id="service" required disabled={!formData.category} value={formData.service} onChange={handleInputChange}>
                                    <option value="">Wybierz usługę</option>
                                    {formData.category && serviceCategories[formData.category].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date"><FaCalendarCheck className="form-icon" /> Data wizyty</label>
                                <input type="date" id="date" required value={formData.date} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hour"><FaClock className="form-icon" /> Godzina</label>
                                <select id="hour" required value={formData.hour} onChange={handleInputChange}>
                                    <option value="">Wybierz godzinę</option>
                                    {generateHours().map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="internalNotes">Dodatkowe uwagi dla serwisu</label>
                                <textarea id="internalNotes" rows="3" placeholder="Opisz usterkę lub zakres prac..." value={formData.internalNotes} onChange={handleInputChange} />
                            </div>
                            <div className="button-container full-width" style={{display: 'flex', gap: '15px'}}>
                                <button type="button" onClick={() => setStep(1)} className="btn-secondary"><FaChevronLeft /> Wróć</button>
                                <button type="submit" className="btn-primary-action" style={{flex: 2}}>Potwierdź rezerwację</button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ReservationPanel;