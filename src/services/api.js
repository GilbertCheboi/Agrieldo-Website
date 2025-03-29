import axios from "axios";
import { toast } from "react-toastify";

// Base API instance
const API = axios.create({
  //baseURL: "http://207.154.253.97:8000/api/", // Update the base URL to match your backend
  baseURL: "https://api.agrieldo.com/api/", // Alternative URL commented out
  timeout: 10000, // Try adding this
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use(
  (config) => {
    console.log("Sending request to:", config.url); // Log the request URL
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Using token:", token); // Log the token being used
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Log request errors
    return Promise.reject(error);
  }
);

// Existing auth functions (unchanged)
export const login = async (credentials) => {
  try {
    const response = await API.post("/accounts/api/token/", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Login API response:", response.data); // Log the full response for debugging

    // Map user_type string to numeric value
    const userTypeMap = {
      farmer: "1",
      vet: "2",
      staff: "3",
    };
    const userType = userTypeMap[response.data.user_type.toLowerCase()] || "1"; // Default to "1" if unknown

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    localStorage.setItem("user_type", userType); // Store as "1", "2", or "3"
    console.log("Stored user_type in localStorage:", userType);

    window.dispatchEvent(new Event("authChanged"));
    return response.data;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const { data } = await API.post("/accounts/api/token/refresh/", {
      refresh: refreshToken,
    });
    console.log("Token refreshed:", data);
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Utility function for auth headers (unchanged)
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  console.log("JWT Token being used:", token); // Debugging
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

// New Inventory API Functions
export const fetchProduce = async () => {
  try {
    const response = await API.get("inventory/produce/", getAuthHeaders());
    console.log("Fetched Produce Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching produce:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchDailyInventory = async (date = null) => {
  try {
    const params = date ? { date } : {};
    const response = await API.get("inventory/daily/", {
      ...getAuthHeaders(),
      params,
    });
    console.log("Fetched Daily Inventory:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching daily inventory:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchProduceDetails = async (id) => {
  try {
    const response = await API.get(
      `inventory/produce/${id}/`,
      getAuthHeaders()
    );
    console.log("Fetched Produce Details:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching produce details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchOutletDetails = async (id) => {
  try {
    const response = await API.get(
      `inventory/outlets/${id}/`,
      getAuthHeaders()
    );
    console.log("Fetched Outlet Details:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching outlet details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchPlateauInventory = async () => {
  try {
    const response = await API.get("inventory/plateau/", getAuthHeaders());
    console.log("Fetched Plateau Inventory Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching plateau inventory:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchOutletInventory = async (outletId) => {
  try {
    const response = await API.get("inventory/outlet/", {
      ...getAuthHeaders(),
      params: { outlet: outletId },
    });
    console.log(`Fetched Inventory for Outlet ${outletId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching outlet inventory:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createInventory = async (inventoryData) => {
  try {
    console.log("Sending Inventory Payload:", inventoryData);
    const response = await API.post(
      "inventory/inventory/",
      inventoryData,
      getAuthHeaders()
    );
    console.log("Created Inventory Entry:", response.data);
    return response.data;
  } catch (error) {
    console.error("Full error response:", error.response?.data);
    const errorMessage = error.response?.data || "Error creating inventory";
    throw new Error(JSON.stringify(errorMessage)); // So you get exact error on frontend
  }
};

export const updateInventory = async (id, updatedData) => {
  try {
    const response = await API.put(
      `inventory/${id}/`,
      updatedData,
      getAuthHeaders()
    );
    console.log("Updated Inventory Entry:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating inventory:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteInventory = async (id) => {
  try {
    await API.delete(`inventory/${id}/`, getAuthHeaders());
    console.log(`Deleted Inventory Entry ${id}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error deleting inventory:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Existing functions (unchanged, included for completeness)
export const fetchAnimals = async () => {
  try {
    const response = await API.get("animals/", getAuthHeaders());
    console.log("Fetched Animals Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching animals:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchAnimalDetails = async (id) => {
  try {
    const response = await API.get(`animals/${id}/`, getAuthHeaders());
    console.log("Fetched Animal Details:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching animal details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchLeads = async () => {
  const token = localStorage.getItem("access_token");
  return await API.get("/profiles/leads/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLead = async (leadData) => {
  const token = localStorage.getItem("access_token");
  return await API.post("/profiles/leads/", leadData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLead = async (id, updatedData) => {
  const token = localStorage.getItem("access_token");
  console.log("Data being sent to API:", updatedData);
  return await API.put(`/profiles/leads/update/${id}/`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteLead = async (id) => {
  const token = localStorage.getItem("access_token");
  return await API.delete(`/profiles/leads/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getInvoices = async () => {
  try {
    const response = await API.get(`/invoices/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await API.post(`/invoices/`, invoiceData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export const fetchFeeds = async () => {
  try {
    const response = await API.get(`feed/feeds/`, getAuthHeaders());
    console.log("Fetched Feeds Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching feeds:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createFeed = async (feedData) => {
  const response = await API.post(`feed/feeds/`, feedData, getAuthHeaders());
  return response.data;
};

export const fetchTransactions = async () => {
  const response = await API.get(`feed/feed-transactions/`, getAuthHeaders());
  return response.data;
};

export const addTransaction = async (transactionData) => {
  const headers = getAuthHeaders();
  console.log("Sending Transaction Data:", transactionData);
  console.log("Headers:", headers);
  try {
    const response = await API.post(
      `feed/feed-transactions/`,
      transactionData,
      headers
    );
    return response.data;
  } catch (error) {
    console.error(
      "Transaction Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchDailyConsumption = async () => {
  const response = await API.get(
    `feed/feed-transactions/daily-consumption/`,
    getAuthHeaders()
  );
  return response.data;
};

export const fetchEmployees = async () => {
  const response = await API.get(`employees/employees/`, getAuthHeaders());
  return response.data;
};

export const fetchTasks = async () => {
  try {
    const response = await API.get("tasks/tasks/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createTask = async (assignedTo, farmId, title, dueDate, time) => {
  try {
    const response = await API.post(
      "tasks/tasks/",
      {
        assigned_to: assignedTo,
        farm: farmId,
        title: title,
        due_date: dueDate,
        time: time,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating task:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await API.patch(
      `tasks/tasks/${taskId}/`,
      updates,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await API.delete(`tasks/tasks/${taskId}/`, getAuthHeaders());
    return { success: true };
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchProductionData = async () => {
  try {
    const response = await API.get(`production/records/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching production data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const addMilkProductionRecords = async (records) => {
  try {
    console.log("🚀 Sending payload:", JSON.stringify(records, null, 2));
    const response = await API.post(
      `animals/production/milk/`,
      records,
      getAuthHeaders()
    ); // No "records" wrapper
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error adding milk production records:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateMilkProductionRecord = async (id, updatedRecord) => {
  try {
    const response = await API.put(
      `production/milk/${id}/`,
      updatedRecord,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating milk production record:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchTodaysMilkProduction = async () => {
  try {
    const response = await API.get(`/production/milk/today/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching today's milk production:", error);
    return [];
  }
};

export const fetchDailyMilkProductionSummary = async () => {
  try {
    const response = await API.get(
      `animals/production/daily-summary/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching daily milk production summary:", error);
    return [];
  }
};

export const fetchLactatingAnimals = async () => {
  try {
    const response = await API.get(
      `animals/production/milk/lactating-animals/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lactating animals:", error);
    return [];
  }
};
export const addProductionRecord = async (record) => {
  try {
    const { commodity, quantity } = record;
    console.log("Sending payload:", { commodity, quantity });
    const response = await API.post(
      `production/records/`,
      { commodity, quantity },
      getAuthHeaders()
    );
    // const response = await API.post(`animals/production/milk/`, { commodity, quantity }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "Error adding production record:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProductionRecord = async (id, updatedRecord) => {
  try {
    const response = await API.put(
      `production/records/${id}/`,
      updatedRecord,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating production record:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchTodaysProductionData = async () => {
  try {
    const response = await API.get(
      `/production/records/today/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching today's production:", error);
    return [];
  }
};

export const fetchProductionHistory = async () => {
  try {
    const response = await API.get(
      `/production/records/history/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching production history:", error);
    return [];
  }
};

export const getFarmStaff = async (farmId) => {
  try {
    const response = await API.get(`/farms/${farmId}/staff/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await API.get(`accounts/list_users/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await API.get(
      `accounts/list_users/${userId}/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addFarmStaff = async (farmId, userId) => {
  try {
    const response = await API.post(
      `/farms/${farmId}/add-staff/`,
      { user_id: userId },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding staff:", error);
    throw error;
  }
};

export const removeFarmStaff = async (farmId, userId) => {
  try {
    await API.delete(
      `/farms/${farmId}/remove-staff/${userId}/`,
      getAuthHeaders()
    );
    return { message: "Staff member removed successfully." };
  } catch (error) {
    console.error("Error removing staff:", error);
    throw error;
  }
};

// Get all vets assigned to a specific farm
export const getFarmVets = async (farmId) => {
  try {
    const response = await API.get(`/farms/${farmId}/vets/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching vets:", error);
    throw error;
  }
};

// Get list of all users eligible to be assigned as vets
export const getVets = async () => {
  try {
    const response = await API.get(`/accounts/list_vets/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching vet users:", error);
    throw error;
  }
};

// Assign vet to a farm
export const addFarmVet = async (farmId, userId) => {
  try {
    const response = await API.post(
      `/farms/${farmId}/add-vet/`,
      { user_id: userId },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning vet:", error);
    throw error;
  }
};

// Remove vet from a farm
export const removeFarmVet = async (farmId, userId) => {
  try {
    await API.delete(
      `/farms/${farmId}/remove-vet/${userId}/`,
      getAuthHeaders()
    );
    return { message: "Vet removed successfully." };
  } catch (error) {
    console.error("Error removing vet:", error);
    throw error;
  }
};

export const getFarms = async () => {
  try {
    const response = await API.get(`farms/get_farms/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching farms:", error);
    throw error;
  }
};

export const createFarm = async (data) => {
  try {
    const response = await API.post("farms/farms/", data, getAuthHeaders()); // ✅ Corrected
    return response.data;
  } catch (error) {
    console.error("Error creating farm:", error);
    throw error;
  }
};

export const getMachineryDetails = async (id) => {
  return await API.get(`/${id}/`);
};

export const getLogs = async (id, logType) => {
  return await API.get(`/${id}/${logType}/`);
};

export const addLog = async (id, logType, data) => {
  return await API.post(`/${id}/${logType}/`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
};

export const fetchDailyTotals = async (startDate = null, endDate = null) => {
  try {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    const response = await API.get("animals/daily-totals/", {
      ...getAuthHeaders(),
      params,
    });
    console.log("Fetched Daily Totals:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching daily totals:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addProductionData = async (animalId, data) => {
  return API.post(
    "animals/production-data/",
    { animal: animalId, ...data },
    getAuthHeaders()
  );
};

export const addHealthRecord = async (animalId, data) => {
  return API.post(
    "animals/health-records/",
    { animal: animalId, ...data },
    getAuthHeaders()
  );
};

export const updateHealthRecord = async (recordId, data) => {
  const headers = getAuthHeaders();
  console.log("Auth Headers:", headers);
  try {
    const response = await API.patch(
      `animals/health-records/${recordId}/`, // Fixed URL
      {
        date: data.date,
        type: data.type,
        details: data.details,
        is_sick: data.is_sick,
        clinical_signs: data.clinical_signs,
        diagnosis: data.diagnosis,
        treatment: data.treatment,
      },
      headers
    );
    console.log("Update health record response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating health record:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addLactationRecord = async (animalId, data) => {
  return API.post(`animals/lactation/${animalId}/`, data, getAuthHeaders());
};

export const addReproductiveHistory = async (animalId, data) => {
  const payload = { animal: animalId, ...data };
  console.log("Reproductive History Payload:", payload); // Add this
  try {
    const response = await API.post(
      "animals/reproductive-history/",
      payload,
      getAuthHeaders()
    );
    console.log("Add reproductive history response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding reproductive history:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchProduceItems = async () => {
  try {
    const response = await API.get("inventory/produce/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching produce:", error);
    throw error;
  }
};

// --- STORES (Plateau) ---
export const fetchStoreInventory = async (
  start_date = null,
  end_date = null
) => {
  try {
    let url = "inventory/inventory/";

    // Add query params if dates are provided
    const params = new URLSearchParams();
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await API.get(url, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching store inventory:", error);
    throw error;
  }
};

// --- OUTLETS ---
export const fetchOutlets = async () => {
  try {
    const response = await API.get("inventory/outlets/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching outlets:", error);
    throw error;
  }
};

// --- INVENTORY LIST (Stock Distribution) ---
export const fetchInventory = async () => {
  try {
    const response = await API.get("inventory/inventory/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

// --- TRANSACTIONS (All Transfers / Additions) ---
export const fetchInventoryTransactions = async () => {
  try {
    const response = await API.get("inventory/transactions/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// --- CREATE TRANSACTION (Transfer or Add to Plateau) ---
export const createTransaction = async (payload) => {
  try {
    const response = await API.post(
      "inventory/transactions/",
      payload,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating transaction:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const fetchStores = async () => {
  try {
    const response = await API.get("inventory/stores/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

export const fetchSheepData = async ({ farmId }) => {
  try {
    const response = await API.get("sheep_app/sheep/", {
      ...getAuthHeaders(),
      params: farmId ? { farm_id: farmId } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sheep data:", error);
    throw error;
  }
};

export const fetchSheepTypes = async () => {
  try {
    const response = await API.get("sheep_app/sheep-types/", getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching sheep types:", error);
    throw error;
  }
};

export const fetchCropData = async ({ farmId }) => {
  try {
    const response = await API.get("sheep_app/crops/", {
      ...getAuthHeaders(),
      params: farmId ? { farm_id: farmId } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crop data:", error);
    throw error;
  }
};

export const createSheep = async (sheepData) => {
  try {
    const response = await API.post(
      "sheep_app/sheep/",
      sheepData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating sheep:", error);
    throw error;
  }
};

export const addSheepProductionRecord = async (data) => {
  const response = await API.post(
    "sheep_app/sheep-production/",
    data,
    getAuthHeaders()
  );
  return response.data;
};

export const addSheepHealthRecord = async (data) => {
  const response = await API.post(
    "sheep_app/sheep-health/",
    data,
    getAuthHeaders()
  );
  return response.data;
};

export const updateSheepHealthRecord = async (id, data) => {
  const response = await API.put(
    `sheep_app/sheep-health/${id}/`,
    data,
    getAuthHeaders()
  );
  return response.data;
};

export const addReproductionRecord = async (data) => {
  const response = await API.post(
    "sheep_app/sheep-reproduction/",
    data,
    getAuthHeaders()
  );
  return response.data;
};

// export const createAnimal = async (animalData) => {
//   try {
//     const response = await API.post(
//       `animals/add/`,
//       animalData,
//       getAuthHeaders()
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error creating animal:", error);
//     throw error;
//   }
// };

export const createAnimal = async (animalData) => {
  try {
    const authHeaders = getAuthHeaders();
    // If animalData is a FormData instance, remove the Content-Type header so the browser sets it properly.
    if (animalData instanceof FormData && authHeaders.headers["Content-Type"]) {
      delete authHeaders.headers["Content-Type"];
    }
    const response = await API.post(`animals/add/`, animalData, authHeaders);
    // ✅ Show success toast
    toast.success("Animal added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    // ✅ Show error toast
    toast.error("Failed to add animal. Please try again.");
    throw error;
  }
};

export const addFeedToStore = async (data) => {
  const response = await API.post("feed/feeds/", data, getAuthHeaders());
  return response.data;
};

// Feed animals in a category
export const feedAnimals = async (data) => {
  const response = await API.post("feed/feed-animals/", data, getAuthHeaders());
  return response.data;
};

// Bonus: Get the list of feeds (optional, if needed separately)
export const getFeeds = async () => {
  const response = await API.get("feed/feeds/", getAuthHeaders());
  return response.data;
};
