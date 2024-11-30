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

// Fetch all appointments with optional pagination
export const fetchAppointments = async (skip = 0, limit = 10): Promise<Appointment[]> => {
  const response = await axios.get(`${API_BASE_URL}/appointments/`, {
    params: { skip, limit },
  });
  return response.data;
};

// Create a new appointment
export const createAppointment = async (data: CreateAppointmentRequest): Promise<Appointment> => {
  const response = await axios.post(`${API_BASE_URL}/appointments/`, data);
  return response.data;
};

// Fetch appointment by ID
export const fetchAppointmentById = async (id: number): Promise<Appointment> => {
  const response = await axios.get(`${API_BASE_URL}/appointments/${id}`);
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/appointments/${id}`);
};
