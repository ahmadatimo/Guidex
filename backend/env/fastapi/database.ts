import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Uses DATABASE_URL from .env
});

// Profile Interface (Types)
interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  school: string;
  role: string;
}

// Function to create a new profile
export const createProfile = async (profile: Profile): Promise<Profile | null> => {
  try {
    const query = `
      INSERT INTO public.profiles (id, first_name, last_name, school, role)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [profile.id, profile.first_name, profile.last_name, profile.school, profile.role];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating profile:', error);
    return null;
  }
};

// Function to fetch a profile by user ID
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const query = `SELECT * FROM public.profiles WHERE id = $1;`;
    const result = await pool.query(query, [userId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
