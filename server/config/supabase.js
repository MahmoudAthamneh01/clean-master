import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
    console.error('⚠️  Missing Supabase configuration. Please check your .env file.');
    console.log('Required variables: SUPABASE_URL, SUPABASE_ANON_KEY');
    // Create a dummy client to prevent crashes
    supabase = null;
} else {
    supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };

// Test connection
export const testSupabaseConnection = async () => {
    try {
        if (!supabase) {
            console.log('⚠️  Supabase not configured');
            return false;
        }
        const { data, error } = await supabase.from('users').select('count').limit(1);
        if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist, which is fine
            throw error;
        }
        console.log('✅ Supabase connected successfully');
        return true;
    } catch (error) {
        console.error('❌ Supabase connection failed:', error.message);
        return false;
    }
}; 