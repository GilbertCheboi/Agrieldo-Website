import React, { useState, useEffect } from "react";
import { fetchDailyMilkProductionSummary } from "../services/api";
import MilkProductionForm from "./MilkProductionForm";
import "./ProductionHistory.css"; // Import styles for layout & FAB

const ITEMS_PER_PAGE = 8; // Pagination limit

const ProductionHistory = () => {
    const [dailyProduction, setDailyProduction] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function loadDailyProduction() {
            try {
                const data = await fetchDailyMilkProductionSummary();

                console.log("API Response:", data); // 🛠 Debug API response

                // Ensure correct data structure
                const records = Array.isArray(data) ? data : data.results || [];

                console.log("Extracted Records:", records); // 🛠 Check extracted data

                // Sort records by date (latest first)
                const sortedData = records.sort((a, b) => new Date(b.date) - new Date(a.date));

                console.log("Sorted Data:", sortedData); // 🛠 Verify sorting

                setDailyProduction(sortedData);
            } catch (error) {
                console.error("Error loading production history:", error);
            }
        }
        loadDailyProduction();
    }, []);

    // Debugging state updates
    useEffect(() => {
        console.log("Updated dailyProduction state:", dailyProduction);
    }, [dailyProduction]);

    // Pagination logic
    const totalPages = Math.ceil(dailyProduction.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = dailyProduction.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="production-history">
            <h2>Milk Production History</h2>
            <table className="production-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Milk Yield (L)</th>
                        <th>Avg Price per Liter</th>
                        <th>Total Feed Consumption</th>
                        <th>Avg SCC</th>
                        <th>Avg Fat %</th>
                        <th>Avg Protein %</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.total_milk_yield?.toFixed(2) || "N/A"}</td>
                                <td>{record.avg_price_per_liter ? parseFloat(record.avg_price_per_liter).toFixed(2) : "N/A"}</td>
                                <td>{record.total_feed_consumption?.toFixed(2) || "N/A"}</td>
                                <td>{record.avg_scc?.toFixed(2) || "N/A"}</td>
                                <td>{record.avg_fat_percentage?.toFixed(2) || "N/A"}</td>
                                <td>{record.avg_protein_percentage?.toFixed(2) || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No production records available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Floating Action Button */}
            <button className="fab" onClick={() => setShowModal(true)}>+</button>

            {/* Milk Production Modal */}
            {showModal && <MilkProductionForm onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default ProductionHistory;
