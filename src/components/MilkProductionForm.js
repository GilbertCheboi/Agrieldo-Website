import React, { useState, useEffect } from 'react';
import { fetchLactatingAnimals, addMilkProductionRecords } from '../services/api';
import './MilkProductionForm.css';

const MilkProductionForm = ({ onClose }) => {
    const [lactatingAnimals, setLactatingAnimals] = useState([]);
    const [entries, setEntries] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [session, setSession] = useState("MORNING");
    const [milkPrice, setMilkPrice] = useState(''); // Start empty
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        async function loadLactatingAnimals() {
            try {
                const data = await fetchLactatingAnimals();
                setLactatingAnimals(data);
                setEntries(data.map(animal => ({
                    animal: animal.id,
                    animal_name: animal.name,
                    date: new Date().toISOString().split('T')[0],
                    session: "MORNING",
                    milk_yield: '', // Start empty
                    feed_consumption: '', // Start empty
                    scc: '', // Start empty
                    fat_percentage: '', // Start empty
                    protein_percentage: '', // Start empty
                    milk_price_per_liter: '', // Start empty
                })));
            } catch (error) {
                console.error("❌ Error fetching lactating animals:", error);
            }
        }
        loadLactatingAnimals();
    }, []);

    useEffect(() => {
        setEntries(prevEntries => prevEntries.map(entry => ({
            ...entry,
            date: date,
            session: session,
            milk_price_per_liter: milkPrice, // Update globally if set
        })));
    }, [date, session, milkPrice]);

    const handleChange = (index, field, value) => {
        setEntries(prevEntries => {
            const updatedEntries = [...prevEntries];
            updatedEntries[index][field] = value; // Keep as string while typing
            return updatedEntries;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const cleanedEntries = entries.map(entry => {
            const milkYield = entry.milk_yield === '' ? 0 : Number(entry.milk_yield);
            const feedConsumption = entry.feed_consumption === '' ? 0 : Number(entry.feed_consumption);
            const scc = entry.scc === '' ? 0 : Number(entry.scc);
            const fatPercentage = entry.fat_percentage === '' ? 0 : Number(entry.fat_percentage);
            const proteinPercentage = entry.protein_percentage === '' ? 0 : Number(entry.protein_percentage);
            const milkPricePerLiter = entry.milk_price_per_liter === '' ? 0 : Number(entry.milk_price_per_liter);
    
            return {
                ...entry,
                milk_yield: milkYield,
                feed_consumption: feedConsumption,
                scc: scc,
                fat_percentage: fatPercentage,
                protein_percentage: proteinPercentage,
                milk_price_per_liter: milkPricePerLiter,
            };
        });
    
        try {
            console.log("📦 Submitting the following data:", JSON.stringify(cleanedEntries, null, 2));
            await addMilkProductionRecords(cleanedEntries); // Sends all animals
            alert('✅ Milk production records added successfully!');
            onClose();
            window.location.reload();
        } catch (error) {
            alert('❌ Failed to add records. Check console for details.');
            console.error("🚨 Submission Error Details:", JSON.stringify(error.response?.data, null, 2));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Record Milk Production</h2>
                <div className="global-controls">
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <label>Session:</label>
                    <select value={session} onChange={(e) => setSession(e.target.value)}>
                        <option value="MORNING">Morning</option>
                        <option value="AFTERNOON">Afternoon</option>
                        <option value="EVENING">Evening</option>
                    </select>
                    <label>Milk Price per Liter:</label>
                    <input
                        type="number"
                        value={milkPrice}
                        onChange={(e) => setMilkPrice(e.target.value)} // Keep as string while typing
                        min="0"
                        step="0.01"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <table className="milk-table">
                        <thead>
                            <tr>
                                <th>Animal</th>
                                <th>Milk Yield (L)</th>
                                <th>Feed Consumption</th>
                                <th>SCC</th>
                                <th>Fat %</th>
                                <th>Protein %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.animal_name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={entry.milk_yield}
                                            onChange={(e) => handleChange(index, 'milk_yield', e.target.value)}
                                            required
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={entry.feed_consumption}
                                            onChange={(e) => handleChange(index, 'feed_consumption', e.target.value)}
                                            required
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={entry.scc}
                                            onChange={(e) => handleChange(index, 'scc', e.target.value)}
                                            required
                                            min="0"
                                            step="1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={entry.fat_percentage}
                                            onChange={(e) => handleChange(index, 'fat_percentage', e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={entry.fat_percentage}
                                            onChange={(e) => handleChange(index, 'protein_percentage', e.target.value)}
                                            required
                                            min="0"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Records"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MilkProductionForm;