import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { createProfile, getProfile } from './database'; // Import profile functions

dotenv.config(); // Load environment variables

// Initialize Supabase client with environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to sign up a user and create a profile
export const signUpUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  school: string,
  role: string
): Promise<void> => {
  try {
    // Sign up the user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create a profile in PostgreSQL after successful signup
      const profile = await createProfile({
        id: data.user.id, // Supabase user_id as primary key in profiles
        first_name,
        last_name,
        school,
        role,
      });
      console.log('Profile created:', profile);
    }
  } catch (error: any) {
    console.error('Error during sign up:', error.message);
  }
};

// Function to sign in a user and fetch their profile
export const signInUser = async (email: string, password: string): Promise<void> => {
  try {
    // Sign in the user using Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Fetch the profile from PostgreSQL
      const profile = await getProfile(data.user.id);
      console.log('Signed in user profile:', profile);
    }
  } catch (error: any) {
    console.error('Error during sign in:', error.message);
  }
};
