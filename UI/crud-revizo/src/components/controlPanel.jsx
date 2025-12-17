import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaCar, FaCalendarAlt, FaTools, FaClipboardList, FaGasPump, 
    FaUser, FaPhoneAlt, FaEnvelope, FaFingerprint 
} from 'react-icons/fa';

const carData = {
    "Audi": {
        "A1": ["1.0 TFSI", "1.5 TFSI", "2.0 TFSI"],
        "A3": ["1.0 TFSI", "1.5 TFSI", "2.0 TFSI", "2.0 TDI", "S3 2.0 TFSI", "RS3 2.5 TFSI"],
        "A4": ["2.0 TFSI", "2.0 TDI", "3.0 TDI", "S4 3.0 TFSI", "RS4 2.9 TFSI"],
        "A5": ["2.0 TFSI", "3.0 TFSI", "2.0 TDI", "3.0 TDI", "RS5 2.9 TFSI"],
        "A6": ["2.0 TFSI", "3.0 TFSI", "2.0 TDI", "3.0 TDI", "RS6 4.0 TFSI"],
        "A7": ["3.0 TFSI", "3.0 TDI", "RS7 4.0 TFSI"],
        "A8": ["3.0 TFSI", "4.0 TFSI", "3.0 TDI", "S8 4.0 TFSI"],
        "Q3": ["1.5 TFSI", "2.0 TFSI", "2.0 TDI", "RS Q3 2.5 TFSI"],
        "Q5": ["2.0 TFSI", "2.0 TDI", "3.0 TDI", "SQ5 3.0 TDI"],
        "Q7": ["3.0 TFSI", "3.0 TDI", "SQ7 4.0 TDI"],
        "Q8": ["3.0 TFSI", "3.0 TDI", "RS Q8 4.0 TFSI"]
    },
    "BMW": {
        "Seria 1": ["116i", "118i", "120i", "118d", "120d", "M135i"],
        "Seria 2": ["218i", "220i", "220d", "M240i", "M2"],
        "Seria 3": ["318i", "320i", "330i", "318d", "320d", "330d", "M340i", "M3"],
        "Seria 4": ["420i", "430i", "420d", "430d", "M440i", "M4"],
        "Seria 5": ["520i", "530i", "540i", "520d", "530d", "540d", "M550i", "M5"],
        "Seria 6": ["630i", "640i", "650i", "635d", "640d", "M6", "630i GT", "640i GT"],
        "Seria 7": ["730d", "740d", "740i", "750i", "M760Li"],
        "X1": ["sDrive18i", "sDrive20i", "xDrive18d", "xDrive20d"],
        "X3": ["xDrive20i", "xDrive30i", "xDrive20d", "xDrive30d", "M40i", "X3 M"],
        "X5": ["xDrive30d", "xDrive40d", "xDrive40i", "xDrive45e", "X5 M"],
        "X6": ["xDrive30d", "xDrive40i", "M50i", "X6 M"],
        "X7": ["xDrive40d", "M50i", "M60i"]
    },
    "Mercedes": {
        "Klasa A": ["A180", "A200", "A250", "A180d", "A200d", "A35 AMG", "A45 S AMG"],
        "Klasa C": ["C180", "C200", "C300", "C220d", "C300d", "C43 AMG", "C63 S AMG"],
        "Klasa E": ["E200", "E300", "E450", "E220d", "E300d", "E400d", "E53 AMG", "E63 S AMG"],
        "Klasa S": ["S350d", "S400d", "S500", "S580", "S63 AMG"],
        "GLA": ["GLA 180", "GLA 200", "GLA 200d", "GLA 220d", "GLA 35 AMG"],
        "GLC": ["GLC 200", "GLC 300", "GLC 220d", "GLC 300d", "GLC 43 AMG", "GLC 63 AMG"],
        "GLE": ["GLE 300d", "GLE 350d", "GLE 400d", "GLE 450", "GLE 53 AMG", "GLE 63 AMG"]
    },
    "Volkswagen": {
        "Polo": ["1.0 MPI", "1.0 TSI", "1.5 TSI", "2.0 GTI"],
        "Golf": ["1.0 TSI", "1.5 TSI", "2.0 TSI", "2.0 TDI", "GTI", "Golf R"],
        "Passat": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "GTE"],
        "Tiguan": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "Tiguan R"],
        "Touareg": ["3.0 V6 TDI", "3.0 V6 TSI", "Touareg R"]
    },
    "Toyota": {
        "Yaris": ["1.0", "1.5", "1.5 Hybrid", "GR Yaris"],
        "Corolla": ["1.2 Turbo", "1.8 Hybrid", "2.0 Hybrid"],
        "RAV4": ["2.0", "2.5 Hybrid", "2.5 Plug-in"],
        "Land Cruiser": ["2.8 D-4D", "4.0 V6"],
        "Supra": ["2.0 Turbo", "3.0 Turbo"]
    },
    "Skoda": {
        "Fabia": ["1.0 TSI", "1.5 TSI"],
        "Octavia": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "RS 2.0 TSI", "RS 2.0 TDI"],
        "Superb": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "iV Hybrid"],
        "Kodiaq": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "RS 2.0 TDI"]
    }
};

function ControlPanel() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        engineCapacity: '',
        description: '',
        clientName: '',
        phone: '',
        email: '',
        vin: ''
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
            ...(id === 'brand' ? { model: '', engineCapacity: '' } : {}),
            ...(id === 'model' ? { engineCapacity: '' } : {})
        }));
    };

    const handleAddCar = (e) => {
        e.preventDefault();
        console.log("Przekazywanie danych:", formData);
        navigate('/reservation', { state: { carDetails: formData } });
    };

    return (
        <div className="control-panel-wrapper">
            <div className="service-card">
                <div className="brand-header">
                    <h1 className="revizo-logo">REVIZO</h1>
                    <p className="subtitle">Panel Zarządzania Pojazdami</p>
                </div>

                <form onSubmit={handleAddCar} className="service-form-grid">
                    <div className="section-title full-width">
                        <h2>Dane Klienta</h2>
                        <div className="hr-accent-mini"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientName"><FaUser className="form-icon" /> IMIĘ I NAZWISKO</label>
                        <input type="text" id="clientName" required value={formData.clientName} onChange={handleInputChange} className="form-control" placeholder="Jan Kowalski" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone"><FaPhoneAlt className="form-icon" /> TELEFON</label>
                        <input type="tel" id="phone" required value={formData.phone} onChange={handleInputChange} className="form-control" placeholder="+48 000 000 000" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email"><FaEnvelope className="form-icon" /> E-MAIL</label>
                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="form-control" placeholder="klient@email.pl" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="vin"><FaFingerprint className="form-icon" /> NUMER VIN</label>
                        <input type="text" id="vin" value={formData.vin} onChange={handleInputChange} className="form-control" placeholder="Opcjonalnie" maxLength="17" />
                    </div>

                    <div className="section-title full-width" style={{marginTop: '20px'}}>
                        <h2>Szczegóły Pojazdu</h2>
                        <div className="hr-accent-mini"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand"><FaCar className="form-icon" /> MARKA</label>
                        <select id="brand" required value={formData.brand} onChange={handleInputChange} className="form-control">
                            <option value="">Wybierz markę</option>
                            {Object.keys(carData).map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="model"><FaTools className="form-icon" /> MODEL</label>
                        <select id="model" required value={formData.model} onChange={handleInputChange} disabled={!formData.brand} className="form-control">
                            <option value="">Wybierz model</option>
                            {formData.brand && Object.keys(carData[formData.brand]).map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="year"><FaCalendarAlt className="form-icon" /> ROK PRODUKCJI</label>
                        <select id="year" required value={formData.year} onChange={handleInputChange} className="form-control">
                            <option value="">Wybierz rok</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="engineCapacity"><FaGasPump className="form-icon" /> POJEMNOŚĆ / SILNIK</label>
                        <select id="engineCapacity" required value={formData.engineCapacity} onChange={handleInputChange} disabled={!formData.model} className="form-control">
                            <option value="">Wybierz silnik</option>
                            {formData.brand && formData.model && carData[formData.brand][formData.model].map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="description"><FaClipboardList className="form-icon" /> UWAGI TECHNICZNE</label>
                        <textarea id="description" rows="3" placeholder="Dodatkowe informacje dla serwisu..." value={formData.description} onChange={handleInputChange} className="control-textarea" />
                    </div>

                    <div className="button-container full-width">
                        <button type="submit" className="btn-primary-action">
                            ZAREZERWUJ TERMIN WIZYTY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ControlPanel;