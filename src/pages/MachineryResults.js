import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { getNearbyMachinery, createMachineryOrder } from "../services/api";

const POLL_INTERVAL_MS = 2 * 60_000;

export default function MachineryResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    acres: "",
    notes: "",
    payment: "",
  });

  const type = searchParams.get("type");
  const userLat = parseFloat(searchParams.get("lat"));
  const userLng = parseFloat(searchParams.get("lng"));
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const { results = [] } = await getNearbyMachinery({
        type,
        lat: userLat,
        lng: userLng,
      });
      setResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type && !isNaN(userLat) && !isNaN(userLng)) {
      fetchData();
      intervalRef.current = setInterval(fetchData, POLL_INTERVAL_MS);
    }
    return () => clearInterval(intervalRef.current);
  }, [type, userLat, userLng]);

  // User location marker (blue)
  const userIcon = new L.Icon({
    iconUrl: "//unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Machinery marker (orange)
  // Machinery marker (tractor icon)
  const machineryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6678/6678123.png", // 🚜 Tractor icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setForm({ name: "", phone: "", acres: "", notes: "" });
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMachineryOrder({
        machineryId: selectedVendor.id,
        customerName: form.name,
        customerPhone: form.phone,
        landSizeAcres: parseFloat(form.acres),
        notes: form.notes,
        paymentMethod: form.payment,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      });

      alert("Order submitted successfully!");
      closeModal();
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Nearby {type}s (auto-refresh every 2 min)
      </h2>

      {loading ? (
        <p>Loading…</p>
      ) : results.length === 0 ? (
        <p>No {type}s found nearby.</p>
      ) : (
        <>
          <MapContainer
            center={[userLat, userLng]}
            zoom={14}
            scrollWheelZoom
            className="w-full h-80 rounded-lg shadow-md z-0"
            style={{ zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {/* User marker */}
            <Marker position={[userLat, userLng]} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Circle radius around user (e.g., 5km) */}
            <Circle
              center={[userLat, userLng]}
              radius={5000} // 5 km radius
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.1,
              }}
            />

            {/* Vendor markers */}
            {results.map((v) => (
              <Marker
                key={v.id}
                position={[v.latitude, v.longitude]}
                icon={machineryIcon}
              >
                <Popup>
                  <strong>{v.name}</strong>
                  <br />
                  {v.type_of_machine} – {v.model}
                  <br />
                  {v.distance_km} km away
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {results.map((v) => (
              <div
                key={v.id}
                className="border rounded-lg shadow-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{v.name}</h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Type:</span>{" "}
                    {v.type_of_machine}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Model:</span> {v.model}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Distance:</span>{" "}
                    {v.distance_km} km
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> KES{" "}
                    {v.price_per_day}/day
                  </p>
                </div>
                <button
                  onClick={() => openModal(v)}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded transition"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">
              Order {selectedVendor.name}'s {selectedVendor.type_of_machine} (
              {selectedVendor.model})
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                placeholder="Your Full Name"
                className="w-full border p-2 rounded focus:outline-none"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                required
                placeholder="Phone Number"
                className="w-full border p-2 rounded focus:outline-none"
              />
              <input
                name="acres"
                value={form.acres}
                onChange={handleFormChange}
                required
                placeholder="Land Size (acres)"
                type="number"
                className="w-full border p-2 rounded focus:outline-none"
              />
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleFormChange}
                placeholder="Additional Details"
                className="w-full border p-2 rounded focus:outline-none"
                rows={3}
              />

              {/* Payment option selector */}
              <select
                name="payment"
                value={form.payment}
                onChange={handleFormChange}
                required
                className="w-full border p-2 rounded focus:outline-none"
              >
                <option value="" disabled>
                  Select Payment Option
                </option>
                <option value="pay_after_service">Pay After Service</option>
                <option value="on_credit">On Credit</option>
              </select>

              {/* Show agreement if "On Credit" selected */}
              {form.payment === "on_credit" && (
                <div className="border rounded-lg p-3 bg-gray-50 text-sm text-gray-700 space-y-2">
                  <p>
                    By choosing <strong>On Credit</strong>, you agree to pay the
                    service provider within <strong>30 days</strong> after
                    completion of service. Failure to do so may result in
                    additional penalties or denial of future services.
                  </p>
                  <label className="flex flex-col space-y-1">
                    <span>
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 mr-2 align-middle"
                      />
                      I have read and agree to the{" "}
                      <a
                        href="/credit-terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 underline hover:text-orange-600"
                      >
                        Credit Terms of Service
                      </a>
                      .
                    </span>
                  </label>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
