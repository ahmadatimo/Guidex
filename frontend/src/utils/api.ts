import axios from "axios";

// API URL
const API_BASE_URL = "http://localhost:8000";


// /*-------------------------------- TYPES -------------------------------- */
export interface LoginResponse {
  access_token: string;
  role : string;
  refresh_token?: string; 
}

export interface Appointment {
  id: number;
  user_id: number;
  guide_id?: number; 
  date: string;
  time: string;
  city: string;
  visitors_number: number;
  note: string;
  status: string;
}

export interface CreateAppointmentRequest {
  date: string; 
  time: string; 
  city: string; 
  visitors_number: number; 
  note?: string; 
}

export interface UpdateAppointmentRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Flexible type for partial updates
}

export interface Notification {
  id: number;
  recipient_id: number;
  appointment_id?: number;
  message: string;
  type: string; // e.g., 'admin', 'guide', 'user'
  is_read: boolean;
  created_at: string; // Timestamp
}

export interface NotificationCreate {
  recipient_id: number;
  appointment_id?: number;
  message: string;
  type: string;
}


/*-------------------------------- AXIOS FUNCTIONS -------------------------------- */

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


/*-------------------------------- AUTH FUNCTIONS -------------------------------- */

// To register a user
export const registerUser = async (
  user_email: string,
  role: string,
  name: string,
  password: string,
  school_name?: string,
  
): Promise<void> => {
    // the body of the register request
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

};

// Function to log in a user
export const loginUser = async (email: string, password: string): Promise<{ access_token: string; role: string }> => {
    // Make the POST request with OAuth2 fields
    const response = await axiosInstance.post(
      "/auth/login", 
      {
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
      }
    );

    // Extract the access token and role from the response
    const { access_token, role } = response.data;

    // Return the token and role
    return { access_token, role };
};

/*-------------------------------- APPOINTMENTS FUNCTIONS --------------------------------*/

// Fetch all appointments with optional pagination
export const fetchAppointments = async (skip = 0, limit = 10): Promise<Appointment[]> => {
  const response = await axiosInstance.get("/appointments/", {
    params: { skip, limit },
  });
  return response.data;
};

// Create a new appointment
export const createAppointment = async (data: CreateAppointmentRequest): Promise<Appointment> => {
  const response = await axiosInstance.post("/appointment", data);
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
export const updateAppointmentStatus = async (id: number, update: { status: string }): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/status`, update); // pass the update object
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
export const fetchAppointmentsForUser = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get(`/user/appointments`);
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


export const fetchAvailableTimes = async (date: string): Promise<string[]> => {
  const response = await axiosInstance.get(`/appointments/available-times/${date}`);
  return response.data;
};

/*-------------------------------- NOTIFICATIONS FUNCTIONS -------------------------------- */

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosInstance.put("/notifications/read-all");
};

export const createNotification = async (data: NotificationCreate): Promise<Notification> => {
  const response = await axiosInstance.post("/notifications", data);
  return response.data;
};

export const deleteNotification = async (notificationId: number): Promise<void> => {
  await axiosInstance.delete(`/notifications/${notificationId}`);
};

export const filterNotifications = async (
  type?: string,
  isRead?: boolean
): Promise<Notification[]> => {
  const params: { type?: string; is_read?: boolean } = {};
  if (type) params.type = type;
  if (isRead !== undefined) params.is_read = isRead;

  const response = await axiosInstance.get("/notifications/filter", { params });
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number): Promise<void> => {
  await axiosInstance.put(`/notifications/${notificationId}/read`);
};

