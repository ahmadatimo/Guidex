import axios from "axios";

// API URL
const API_BASE_URL = "http://localhost:8000";


// /*-------------------------------- TYPES -------------------------------- */


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

export interface User {
  user_id: number;
  name: string;
  user_email: string;
  role: string;
  school_name: string
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
  return sessionStorage.getItem("access_token"); // Assume token is stored in localStorage
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
export const loginUser = async (email: string, password: string): Promise<string> => {
  // try {
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
  const { access_token, role, name, user_email } = response.data;

  // Store the token in localStorage
  sessionStorage.setItem("access_token", access_token);
  sessionStorage.setItem("role", role);
  sessionStorage.setItem("name" , name);
  sessionStorage.setItem("user_email" , user_email);
  console.log("Login successful, token stored in localStorage.");
  // return it to the LoginPage
  return role;
};

// To update user information
export const updateUser = async (
  updates: Partial<{ name: string; user_email: string; password?: string }>
): Promise<{ message: string; updated_user: Record<string, any> }> => {
  try {
    const response = await axiosInstance.patch("/auth/update_user", updates, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("User updated successfully:", response.data);
    return response.data; // Return the success message and updated user details
  } catch (error: any) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.detail || "Failed to update user. Please try again."
    );
  }
};

/*-------------------------------- APPOINTMENTS FUNCTIONS --------------------------------*/

export const fetchAllAppointments = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get('/');
  return response.data;
}

// Fetch all appointments with optional pagination
export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axiosInstance.get("/appointment");
    return response.data; // API returns appointments in JSON format
  } catch (error: any) {
    console.error("Error fetching appointments:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Failed to fetch appointments");
  }
};

// Create a new appointment
export const createAppointment = async (data: CreateAppointmentRequest): Promise<Appointment> => {
  const response = await axiosInstance.post("/create-appointment", data);
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

// Approve appointment status
export const approveAppointment = async (id: number): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/approve`); 
  return response.data;
};

// Approve appointment status
export const rejectAppointment = async (id: number): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/reject`); 
  return response.data;
};

// Assign a guide to an appointment
export const assignGuideToAppointment = async (id: number): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/assign-guide`);
  return response.data;
};

// Unassign a guide from an appointment
export const unassignGuideFromAppointment = async (id: number, status: { status: string }): Promise<Appointment> => {
  const response = await axiosInstance.put(`/appointments/${id}/unassign-guide`, status);
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
  try{
    const response = await axiosInstance.get("/guides/available-appointments");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Handle 404 specifically
      console.warn("No available appointments found for guides.");
      return []; // Return an empty array if no appointments exist
    }
    throw error; // Re-throw other errors
  }
};

// Fetch appointments assigned to a specific guide
export const fetchAssignedAppointmentsForGuide = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get(`/guide/appointments`);
  return response.data;
};


export const fetchAvailableTimes = async (date: string): Promise<string[]> => {
  const response = await axiosInstance.get(`/appointments/available-times/${date}`);
  return response.data;
};


// Fetch school name for an appointment
export const fetchSchoolNameForAppointment = async (appointmentId: number): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/appointment/${appointmentId}/school`);
    return response.data.school_name; // Extract school name from the response
  } catch (error: any) {
    console.error("Error fetching school name:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.detail || "Failed to fetch the school name. Please try again."
    );
  }
};

// returning appointments for the admins
export const fetchAdminsAppointments = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get('/admin/appointments');
  return response.data;
}

/*-------------------------------- NOTIFICATIONS FUNCTIONS -------------------------------- */

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get("/notifications/hi");
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


export const custom_notification = async (
  message: string,
  notificationType: string
): Promise<void> => {
  await axiosInstance.post("/notifications/custom-guide-notification", {
    message,
    notification_type: notificationType,
  });
};
