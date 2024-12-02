import axios from "axios";

// API URL
const API_BASE_URL = "http://localhost:8000";

// Define types



export interface LoginResponse {
  access_token: string;
  role : string;
  refresh_token?: string; // Optional, depending on your backend
}

export interface Appointment {
  id: number;
  user_id: number;
  guide_id?: number; // Guides can be assigned later
  date: string;
  time: string;
  city: string;
  visitors: number;
  note: string;
  status: string; // Includes the new `status` field
}

export interface CreateAppointmentRequest {
  user_id: number;
  date: string;
  time: string;
  city?: string;
  visitors: number;
  guide_id?: number
  note?: string;
}

export interface UpdateAppointmentRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Flexible type for partial updates
}

// Add a utility function to get the token
const getAuthToken = (): string | null => {
  return localStorage.getItem("access_token"); // Assume token is stored in localStorage
};

// Configure Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// To register a user
export const registerUser = async (
  user_email: string,
  role: string,
  name: string,
  school_name: string,
  password: string
): Promise<void> => {
  try {
    // Prepare the request payload
    const requestBody = {
      user_email,
      role,
      name,
      school_name,
      password
    };

    // Make the POST request
    const response = await axiosInstance.post("/auth/register", requestBody, {
      headers: {
        "Content-Type": "application/json" // Specify JSON content type
      }
    });

    console.log("User registered successfully:", response.data);
  } catch (error: any) {
    console.error("Error during user registration:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed. Please try again.");
  }
};

// Function to log in a user
export const loginUser = async (email: string, password: string): Promise<void> => {
  try {
    // Make the POST request with OAuth2 fields
    const response = await axiosInstance.post("/auth/login", {
      grant_type: "password", // Required field for password grant
      username: email, 
      password: password, // User's password
      scope: "", 
      client_id: "", 
      client_secret: ""
    }, 
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    // Extract the access token from the response
    const { access_token } = response.data;

    // Store the token in localStorage
    localStorage.setItem("access_token", access_token);

    console.log("Login successful, token stored in localStorage.");
  } catch (error: any) {
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

// Fetch all appointments with optional pagination
export const fetchAppointments = async (skip = 0, limit = 10): Promise<Appointment[]> => {
  const response = await axiosInstance.get("/appointments/", {
    params: { skip, limit },
  });
  return response.data;
};

// Create a new appointment
export const createAppointment = async (data: CreateAppointmentRequest): Promise<Appointment> => {
  const response = await axiosInstance.post("/appointments/", data);
  return response.data;
};

// Fetch appointment by ID
export const fetchAppointmentById = async (id: number): Promise<Appointment> => {
  const response = await axiosInstance.get(`/appointments/${id}`);
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/appointments/${id}`);
};

// Fetch appointments by status
export const fetchAppointmentsByStatus = async (status: string): Promise<Appointment[]> => {
  const response = await axiosInstance.get(`/appointments/status/${status}`);
  return response.data;
};

// Update appointment status
export const updateAppointmentStatus = async (id: number, status: string): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/status`, { status });
  return response.data;
};

// Assign a guide to an appointment
export const assignGuideToAppointment = async (id: number, guide_id: number): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/assign-guide`, { guide_id });
  return response.data;
};

// Unassign a guide from an appointment
export const unassignGuideFromAppointment = async (id: number): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/unassign-guide`);
  return response.data;
};

// Update appointment details
export const updateAppointmentDetails = async (id: number, updates: UpdateAppointmentRequest): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}`, updates);
  return response.data;
};

// Fetch appointments for a specific user
export const fetchAppointmentsForUser = async (user_id: number): Promise<Appointment[]> => {
  const response = await axiosInstance.get(`/user/${user_id}/appointments`);
  return response.data;
};

// Fetch available appointments for guides
export const fetchAvailableAppointmentsForGuides = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get("/guides/available-appointments");
  return response.data;
};

// Fetch appointments assigned to a specific guide
export const fetchAssignedAppointmentsForGuide = async (guide_id: number): Promise<Appointment[]> => {
  const response = await axiosInstance.get(`/guide/${guide_id}/appointments`);
  return response.data;
};
