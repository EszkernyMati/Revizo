import React, { useState } from 'react';
import { FaCar, FaCalendarAlt, FaTools, FaClipboardList, FaGasPump } from 'react-icons/fa';

const carData = {
    "Audi": {
        "A5": ["2.0 TFSI", "3.0 TFSI", "2.0 TDI", "3.0 TDI", "RS5 2.9 TFSI"],
        "A4": ["1.8 TFSI", "2.0 TDI", "3.0 TDI", "2.0 TFSI", "S4 3.0 TFSI"],
        "Q5": ["2.0 TDI", "3.0 TDI", "2.0 TFSI", "55 TFSI e", "SQ5 3.0 TDI"],
        "A3": ["1.0 TFSI", "1.5 TFSI", "2.0 TDI", "S3 2.0 TFSI", "RS3 2.5 TFSI"],
        "Q7": ["3.0 TDI", "4.0 TDI", "3.0 TFSI", "55 TFSI", "60 TFSI e"]
    },
    "BMW": {
        "Seria 3": ["318i 2.0", "320d 2.0", "330i 2.0", "M340i 3.0", "M3 3.0"],
        "Seria 5": ["520d 2.0", "530i 2.0", "540i 3.0", "M550i 4.4", "M5 4.4"],
        "X5": ["xDrive30d 3.0", "xDrive40i 3.0", "xDrive45e 3.0", "M50d 3.0", "X5 M 4.4"],
        "Seria 1": ["116i 1.5", "118d 2.0", "120i 2.0", "128ti 2.0", "M135i 2.0"],
        "X3": ["xDrive20d 2.0", "xDrive30i 2.0", "M40i 3.0", "M40d 3.0", "X3 M 3.0"]
    },
    "Mercedes": {
        "Klasa C": ["C180 1.5", "C220d 2.0", "C300 2.0", "C43 AMG 3.0", "C63 AMG 4.0"],
        "Klasa E": ["E220d 2.0", "E300 2.0", "E450 3.0", "E53 AMG 3.0", "E63 AMG 4.0"],
        "GLC": ["200d 2.0", "300 2.0", "400d 2.9", "43 AMG 3.0", "63 AMG 4.0"],
        "Klasa A": ["A180 1.3", "A200 1.3", "A220d 2.0", "A35 AMG 2.0", "A45 AMG 2.0"],
        "GLE": ["300d 2.0", "350de 2.0", "450 3.0", "53 AMG 3.0", "63 S AMG 4.0"]
    },
    "Ford": {
        "Focus": ["1.0 EcoBoost", "1.5 EcoBlue", "2.0 EcoBlue", "ST 2.3 EcoBoost", "1.6 Ti-VCT"],
        "Mustang": ["2.3 EcoBoost", "5.0 V8 GT", "Mach 1 5.0 V8", "Shelby GT500", "3.7 V6"],
        "Mondeo": ["1.5 EcoBoost", "2.0 Hybrid", "2.0 TDCi", "2.0 EcoBlue", "2.5 iVCT"],
        "Kuga": ["1.5 EcoBoost", "2.0 EcoBlue", "2.5 FHEV", "2.5 PHEV", "1.5 TDCi"],
        "Ranger": ["2.0 EcoBlue", "2.2 TDCi", "3.2 TDCi", "3.0 V6 EcoBlue", "Raptor 2.0"]
    },
    "KIA": {
        "Ceed": ["1.0 T-GDI", "1.4 T-GDI", "1.5 T-GDI", "1.6 CRDi", "GT 1.6 T-GDI"],
        "Sportage": ["1.6 T-GDI", "1.6 CRDi", "1.6 HEV", "1.6 PHEV", "2.0 CRDi"],
        "Stinger": ["2.0 T-GDI", "2.2 CRDi", "3.3 V6 T-GDI", "2.0 Turbo", "3.3 Twin Turbo"],
        "Niro": ["1.6 GDI Hybrid", "EV 204KM", "PHEV 1.6 GDI", "Electric 136KM", "HEV 141KM"],
        "Sorento": ["2.2 CRDi", "1.6 HEV", "1.6 PHEV", "2.5 GDI", "3.5 V6"]
    },
    "Opel": {
        "Astra": ["1.2 Turbo", "1.4 Turbo", "1.5 Diesel", "1.6 Turbo", "GSe 1.6 PHEV"],
        "Insignia": ["1.5 Turbo", "2.0 Turbo", "1.6 CDTi", "2.0 CDTi", "GSi 2.0 Turbo"],
        "Corsa": ["1.2 PureTech", "1.2 Turbo", "1.5 Diesel", "Corsa-e", "1.4 EcoTec"],
        "Mokka": ["1.2 Turbo", "1.5 Diesel", "Mokka-e", "1.4 Turbo", "1.6 CDTi"],
        "Grandland": ["1.2 Turbo", "1.5 Diesel", "1.6 Turbo PHEV", "2.0 Diesel", "1.6 Turbo"]
    },
    "Hyundai": {
        "i30": ["1.0 T-GDI", "1.4 T-GDI", "1.5 DPi", "1.6 CRDi", "i30 N 2.0 T-GDI"],
        "Tucson": ["1.6 T-GDI", "1.6 CRDi", "1.6 HEV", "1.6 PHEV", "2.0 CRDi"],
        "Kona": ["1.0 T-GDI", "1.6 T-GDI", "Hybrid 1.6 GDI", "Electric 64kWh", "Kona N 2.0"],
        "i20": ["1.0 T-GDI", "1.2 MPI", "1.4 MPI", "1.1 CRDi", "i20 N 1.6 T-GDI"],
        "Santa Fe": ["2.2 CRDi", "1.6 HEV", "1.6 PHEV", "2.4 GDI", "3.5 V6"]
    }
};

function ControlPanel() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [engineCapacity, setEngineCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [cars, setCars] = useState([]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        setModel('');
        setEngineCapacity('');
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
        setEngineCapacity('');
    };

    const handleAddCar = (e) => {
        e.preventDefault();
        const newCar = {
            id: Date.now(),
            brand,
            model,
            year,
            engineCapacity,
            description,
            createdAt: new Date().toLocaleString()
        };
        setCars([...cars, newCar]);
        setBrand('');
        setModel('');
        setYear('');
        setEngineCapacity('');
        setDescription('');
        alert("Pojazd dodany pomyślnie!");
    };

    return (
        <div className="control-panel-wrapper">
            <div className="service-card">
                <div className="brand-header">
                    <h1 className="revizo-logo">REVIZO</h1>
                    <p className="subtitle">Panel Zarządzania Pojazdami</p>
                </div>

                <div className="section-title">
                    <h2>Nowy Przegląd</h2>
                    <div className="hr-accent-mini"></div>
                </div>

                <form onSubmit={handleAddCar} className="service-form-grid">
                    <div className="form-group">
                        <label htmlFor="brand">
                            <FaCar className="form-icon" /> MARKA
                        </label>
                        <select 
                            id="brand" 
                            required 
                            value={brand} 
                            onChange={handleBrandChange}
                            className="form-control"
                        >
                            <option value="">Wybierz markę</option>
                            {Object.keys(carData).map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">
                            <FaTools className="form-icon" /> MODEL
                        </label>
                        <select 
                            id="model" 
                            required 
                            value={model} 
                            onChange={handleModelChange}
                            disabled={!brand}
                            className="form-control"
                        >
                            <option value="">Wybierz model</option>
                            {brand && Object.keys(carData[brand]).map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">
                            <FaCalendarAlt className="form-icon" /> ROK PRODUKCJI
                        </label>
                        <select 
                            id="year" 
                            required 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)}
                            className="form-control"
                        >
                            <option value="">Wybierz rok</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="engine">
                            <FaGasPump className="form-icon" /> POJEMNOŚĆ / SILNIK
                        </label>
                        <select 
                            id="engine" 
                            required 
                            value={engineCapacity} 
                            onChange={(e) => setEngineCapacity(e.target.value)}
                            disabled={!model}
                            className="form-control"
                        >
                            <option value="">Wybierz silnik</option>
                            {brand && model && carData[brand][model].map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="desc">
                            <FaClipboardList className="form-icon" /> UWAGI I OPIS TECHNICZNY
                        </label>
                        <textarea 
                            id="desc"
                            rows="4"
                            placeholder="Opisz stan pojazdu lub zakres prac..."
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="control-textarea"
                        />
                    </div>

                    <div className="button-container full-width">
                        <button type="submit" className="btn-primary-action">
                            ZATWIERDŹ I PRZEJDŹ DALEJ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ControlPanel;