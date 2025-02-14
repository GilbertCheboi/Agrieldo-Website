import axios from "axios";

// Base API instance
const API = axios.create({
  //baseURL: "http://207.154.253.97:8000/api/", // Update the base URL to match your backend
  baseURL: "https://api.agrieldo.com/api/", // Update the base URL to match your backend

});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use(
    (config) => {
      console.log('Sending request to:', config.url); // Log the request URL
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Using token:', token); // Log the token being used
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error); // Log request errors
      return Promise.reject(error);
    }
  );

  export const login = async (credentials) => {
    try {
      const response = await API.post('/accounts/api/token/', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Store tokens
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
  
      // Dispatch event to notify all components
      window.dispatchEvent(new Event("authChanged"));
  
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    try {
      const { data } = await API.post('/accounts/api/token/refresh/', { refresh: refreshToken });
      console.log('Token refreshed:', data);
  
      // Store the new access token
      localStorage.setItem('access_token', data.access);
      return data.access;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };
  



  export const fetchLeads = async () => {
    const token = localStorage.getItem('access_token');
    return await API.get('/profiles/leads/', {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Create a new lead
  export const createLead = async (leadData) => {
    const token = localStorage.getItem('access_token');
    return await API.post('/profiles/leads/', leadData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Update an existing lead
  export const updateLead = async (id, updatedData) => {
    const token = localStorage.getItem('access_token');
  
    // Log the data being sent to the API
    console.log("Data being sent to API:", updatedData);
  
    return await API.put(`/profiles/leads/update/${id}/`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  // Delete a lead
  export const deleteLead = async (id) => {
    const token = localStorage.getItem('access_token');
    return await API.delete(`/profiles/leads/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };



export const getInvoices = async () => {
  try {
    const response = await API.get(`(/invoices/`);
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
  
  export const fetchFeeds = async () => {
    try {
      const response = await API.get(`feed/feeds/`, getAuthHeaders());
      console.log("Fetched Feeds Data:", response.data); // Log the data
      return response.data;
    } catch (error) {
      console.error("Error fetching feeds:", error.response ? error.response.data : error.message);
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
    
    console.log("Sending Transaction Data:", transactionData);  // Debugging
    console.log("Headers:", headers);
  
    try {
      const response = await API.post(`feed/feed-transactions/`, transactionData, headers);
      return response.data;
    } catch (error) {
      console.error("Transaction Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  
  export const fetchDailyConsumption = async () => {
    const response = await API.get(`feed/feed-transactions/daily-consumption/`, getAuthHeaders());
    return response.data;
  };
  
// Fetch Employees
export const fetchEmployees = async () => {
    const response = await API.get(`employees/employees/`, getAuthHeaders());
    return response.data;
  };
  

  // Fetch All Tasks
  export const fetchTasks = async () => {
    try {
      const response = await API.get("tasks/tasks/", getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  // Create a New Task
  export const createTask = async (assignedTo, farmId, title, dueDate, time) => {
    try {
      const response = await API.post(
        "tasks/tasks/",
        {
          assigned_to: assignedTo, // Employee assigned to the task
          farm: farmId,           // Farm ID
          title: title,           // Task title
          due_date: dueDate,      // Task date
          time: time,             // Task time
        },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
      
  
  // Update Task Status or Details
  export const updateTask = async (taskId, updates) => {
    try {
      const response = await API.patch(`tasks/tasks/${taskId}/`, updates, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  // Delete a Task
  export const deleteTask = async (taskId) => {
    try {
      await API.delete(`tasks/tasks/${taskId}/`, getAuthHeaders());
      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  


// Fetch all production records
export const fetchProductionData = async () => {
    try {
      const response = await API.get(`production/records/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching production data:", error.response?.data || error.message);
      throw error;
    }
  };
  
  // Add a new production record (Ensure authentication token is passed)
  export const addProductionRecord = async (record) => {
    try {
      const { commodity, quantity } = record;
      console.log("Sending payload:", { commodity, quantity });  // ✅ Debugging
  
      const response = await API.post(`production/records/`, { commodity, quantity }, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error adding production record:", error.response?.data || error.message);
      throw error;
    }
  };
  
  // Update an existing production record
  export const updateProductionRecord = async (id, updatedRecord) => {
    try {
      const response = await API.put(`production/records/${id}/`, updatedRecord, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error updating production record:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const fetchTodaysProductionData = async () => {
    try {
      const response = await API.get(`/production/records/today/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching today's production:", error);
      return [];
    }
  };

  export const fetchProductionHistory = async () => {
    try {
      const response = await API.get(`/production/records/history/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching production history:", error);
      return [];
    }
  };



// ✅ Fetch farm employees
export const getFarmStaff = async (farmId) => {
    try {
        const response = await API.get(`/farms/${farmId}/staff/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching staff:", error);
        throw error;
    }
};

// ✅ Fetch all users (for adding as staff)
export const getUsers = async () => {
    try {
        const response = await API.get(`accounts/list_users/`,getAuthHeaders() );
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// ✅ Add a user as farm staff
export const addFarmStaff = async (farmId, userId) => {
    try {
        const response = await API.post(`/farms/${farmId}/add-staff/`, { user_id: userId }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error adding staff:", error);
        throw error;
    }
};

// ✅ Remove a staff member from a farm
export const removeFarmStaff = async (farmId, userId) => {
    try {
        await API.delete(`/farms/${farmId}/remove-staff/${userId}/`, getAuthHeaders());
        return { message: "Staff member removed successfully." };
    } catch (error) {
        console.error("Error removing staff:", error);
        throw error;
    }
};



export const getFarms  = async () => {
  try {
      const response = await API.get(`farms/get_farms/`,getAuthHeaders() );
      return response.data;
  } catch (error) {
      console.error("Error fetching farms:", error);
      throw error;
  }
};

