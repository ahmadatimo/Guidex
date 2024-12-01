import axios from "axios";

// API URL
const API_BASE_URL = "http://localhost:8000";

// Define types
export interface Appointment {
  id: number;
  user_id: number;
  date: string;
  time: string;
  city: string;
  visitors: number;
  GM: string;
  GM_phone: string;
  GM_email: string;
  note: string;
}

export interface CreateAppointmentRequest {
  user_id: number;
  date: string;
  time: string;
  city: string;
  visitors: number;
  GM: string;
  GM_phone: string;
  GM_email: string;
  note: string;
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
