import React, { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { getFarms, getUsers, getFarmVets, addFarmVet, removeFarmVet } from "../services/api"; // Replaced getVets with getUsers

const VetStaff = () => {
    const [farms, setFarms] = useState([]);
    const [selectedFarmId, setSelectedFarmId] = useState("");
    const [assignedVets, setAssignedVets] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFarms().then(setFarms).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedFarmId) {
            getFarmVets(selectedFarmId).then(setAssignedVets).catch(console.error);
        }
    }, [selectedFarmId]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
    }, []);

    const handleAddVet = async () => {
        if (!selectedUser || !selectedFarmId) return;
        setLoading(true);
        try {
            const response = await addFarmVet(selectedFarmId, selectedUser);
            setAssignedVets([...assignedVets, response.vet]);
            setModalOpen(false);
            setSelectedUser("");
        } catch (error) {
            console.error("Error adding vet:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveVet = async (vetUserId) => {
        try {
            await removeFarmVet(selectedFarmId, vetUserId);
            setAssignedVets(assignedVets.filter(member => member.user.id !== vetUserId));
        } catch (error) {
            console.error("Error removing vet:", error);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg relative">
            <h2 className="text-2xl font-bold mb-4">Farm Vets</h2>

            <select
                className="mb-4 w-full p-2 border rounded-md"
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
            >
                <option value="">Select a Farm</option>
                {farms.map(farm => (
                    <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
            </select>

            {selectedFarmId ? (
                assignedVets.length > 0 ? (
                    <table className="w-full border border-gray-200 rounded-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedVets.map(vet => (
                                <tr key={vet.id} className="border-t">
                                    <td className="p-3">{vet.user.first_name} {vet.user.last_name}</td>
                                    <td className="p-3">{vet.user.email}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveVet(vet.user.id)}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No vets assigned yet.</p>
                )
            ) : (
                <p className="text-gray-500">Please select a farm to manage vets.</p>
            )}

            <button
                className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition"
                onClick={() => setModalOpen(true)}
                disabled={!selectedFarmId}
            >
                <Plus size={24} />
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Assign Vet</h3>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select Vet</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.first_name} {user.username} ({user.email})
                                </option>
                            ))}
                        </select>
                        <button
                            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            onClick={handleAddVet}
                            disabled={loading || !selectedFarmId}
                        >
                            {loading ? "Assigning..." : "Assign Vet"}
                        </button>
                        <button
                            className="mt-2 w-full bg-gray-300 p-2 rounded-md hover:bg-gray-400"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VetStaff;
